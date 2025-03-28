// routes/api/spots.js
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be within -90 and 90'),
  check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be within -180 and 180'),
  check('name').notEmpty().isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Get all spots (with avgRating and previewImage)
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      { model: Review },
      { model: SpotImage }
    ]
  });

  const formatted = spots.map(spot => {
    const reviews = spot.Reviews;
    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
      : 0;

    const previewImage = spot.SpotImages.find(img => img.preview)?.url || null;

    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating,
      previewImage
    };
  });

  res.json({ Spots: formatted });
});

// Get spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: { ownerId: req.user.id },
    include: [Review, SpotImage]
  });

  const formatted = spots.map(spot => {
    const avgRating = spot.Reviews.length
      ? spot.Reviews.reduce((sum, r) => sum + r.stars, 0) / spot.Reviews.length
      : 0;
    const previewImage = spot.SpotImages.find(img => img.preview)?.url || null;

    return { ...spot.toJSON(), avgRating, previewImage };
  });

  res.json({ Spots: formatted });
});

// Get spot details
router.get('/:id', async (req, res) => {
  const spot = await Spot.findByPk(req.params.id, {
    include: [
      { model: SpotImage },
      { model: User, as: 'Owner' },
      { model: Review }
    ]
  });

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  const avgStarRating = spot.Reviews.length
    ? spot.Reviews.reduce((sum, r) => sum + r.stars, 0) / spot.Reviews.length
    : 0;

  const numReviews = spot.Reviews.length;

  const result = {
    ...spot.toJSON(),
    avgStarRating,
    numReviews
  };

  res.json(result);
});

// Create a new spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const spot = await Spot.create({ ...req.body, ownerId: req.user.id });
  res.status(201).json(spot);
});

// Add an image to a spot
router.post("/:id/images", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  const { url, preview } = req.body;
  const image = await SpotImage.create({ spotId: spot.id, url, preview });
  res.status(201).json({ id: image.id, url: image.url, preview: image.preview });
});

// Edit a spot
router.put("/:id", requireAuth, validateSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  await spot.update(req.body);
  res.json(spot);
});

// Delete a spot
router.delete("/:id", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  await spot.destroy();
  res.json({ message: "Successfully deleted" });
});

// Create review for a spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  const existingReview = await Review.findOne({
    where: { spotId: req.params.spotId, userId: req.user.id }
  });

  if (existingReview) return res.status(500).json({ message: "User already has a review for this spot" });

  const newReview = await Review.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    review,
    stars
  });

  res.status(201).json(newReview);
});

// Get all reviews for a spot
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [User, ReviewImage]
  });

  res.json({ Reviews: reviews });
});

module.exports = router;
