// backend/routes/api/spots.js

const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

// Middleware to validate spot creation
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage("State is required"),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage("Country is required"),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid must be within -90 and 90"),
  check('lng').exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid must be within -180 and 180"),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty().isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min: 1, max: 100000 })
    .withMessage("Price per day must be a positive number"),
handleValidationErrors
];

// Middleware to validate review creation
const validateReviews = [
  check('review').exists({ checkFalsy: true }).notEmpty().withMessage("Review text is required"),
  check('stars').exists({ checkFalsy: true }).isInt({}).withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];


// Get all spots
  router.get("/", async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const where = {};

    // Parse query params and apply defaults
    page = parseInt(page) || 1;
    size = parseInt(size) || 20;

    if (page < 1) page = 1;
    if (size < 1) size = 20;
    if (size > 20) size = 20;

    // Filters
    if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
    if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
    if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
    if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

    // Fetch spots with associated reviews and images
    const spots = await Spot.findAll({
      where,
      include: [
        { model: Review },
        { model: SpotImage }
      ],
      limit: size,
      offset: size * (page - 1)
    });

    // Format response with average rating and preview image
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

    res.json({ Spots: formatted, page, size });
  });


  // Get all spots of current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const currentUser = req.user.id;
        
        // Fetch all spots created by current user with reviews and images
        const allSpots = await Spot.findAll({
            where: { ownerId: currentUser },
            include: [
                { model: Review, attributes: ['stars'] },
                { model: SpotImage, attributes: ['url', 'preview'] }
            ]
        });

        // Format spots response with average rating and preview image
        const extractSpotData = allSpots.map(spot => {
            const spotStarReviews = spot.toJSON();
            const reviewStars = spotStarReviews.Reviews;
        
            let avgRating = null;
            let reviewStarsLength = reviewStars.length;

            if(reviewStarsLength > 0){
                const totalStars = reviewStars.reduce((sum, starVal) => sum += starVal.stars, 0)
                
                avgRating = totalStars / reviewStarsLength;
            }

            const previewImg = spotStarReviews.SpotImages.find(img => img.preview === true);
            const previewImage = previewImg ? previewImg.url : null;

            return {
                id: spotStarReviews.id,
                ownerId: spotStarReviews.ownerId,
                address: spotStarReviews.address,
                city: spotStarReviews.city,
                state: spotStarReviews.state,
                country: spotStarReviews.country,
                lat: spotStarReviews.lat,
                lng: spotStarReviews.lng,
                name:spotStarReviews.name,
                description: spotStarReviews.description,
                price: spotStarReviews.price,
                createdAt: spotStarReviews.createdAt,
                updatedAt: spotStarReviews.updatedAt,
                avgRating: avgRating,
                previewImage: previewImage
            }
        })

        res.status(200).json({ Spots: extractSpotData  })
    }
     catch (error) { 
        next(error)
    }
});

// Get detailed data of a single spot
router.get('/:id', async (req, res, next) => {
  try {
      const getSpotId = req.params.id;

      // Find spot with images, owner info, and reviews
      const currentSpot = await Spot.findByPk(getSpotId, {
          include: [
              { model: SpotImage, attributes: ['id','url','preview'] },
              { model: User, attributes: ['id','firstName','lastName'] },
              { model: Review, attributes: ['stars'] }
          ]
      });

      if (!currentSpot) {
          return res.status(404).json({ message: "Spot couldn't be found" });
      }
      // Calculate average rating
      const spotStarReviews = currentSpot.toJSON();
      const reviewArr = spotStarReviews.Reviews;
      const numReviews = reviewArr.length;

      let avgRating = null;
      if (numReviews > 0) {
          const totalStars = reviewArr.reduce((sum, starVal) => sum + starVal.stars, 0);
          avgRating = totalStars / numReviews;
      }
      // Construct final output
      const Spots = {
          ...spotStarReviews,
          numReviews,
          avgRating,
          SpotImages: spotStarReviews.SpotImages,
          Owner: spotStarReviews.User
      };

      res.status(200).json({ Spots });
  } catch (error) {
      next(error);
  }
});

// Create new spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  try {
      const ownerId = req.user.id;
      const newSpot = await Spot.create({ ownerId, ...req.body });
      res.status(201).json(newSpot);
  } catch (error) {
      next(error);
  }
});

// Add image to a spot
router.post('/:id/images', requireAuth, async (req, res, next) => {
  const getSpotId = req.params.id;
  const getOwnerId = req.user.id;

  try {
      const currentSpot = await Spot.findByPk(getSpotId);

      // Check for spot existence and owner authorization
      if (!currentSpot) return res.status(404).json({ message: "Spot couldn't be found" });
      if (currentSpot.ownerId !== getOwnerId) return res.status(403).json({ message: 'Forbidden' });

      // Create and return new spot image
      const { url, preview } = req.body;

      const newImageSpot = await SpotImage.create({ 
        spotId: 
        getSpotId, 
        url, 
        preview 
      });

      res.status(201).json({
          id: newImageSpot.id,
          url: newImageSpot.url,
          preview: newImageSpot.preview
      });
  } catch (error) {
      next(error);
  }
});

// Edit a spot
router.put('/:id', requireAuth, validateSpot, async (req, res, next) => {
    // spot id and updated data
    const getSpotId = req.params.id;
    const getOwnerId = req.user.id;

    try{
        const getSpot = await Spot.findByPk(getSpotId);
        // Checks if spot exists, if spot doesnt, returns 404
        if(!getSpot){
            return res.status(404).json({ message: "Spot couldn't be found" })
        }
        // Check for ownership, if not then it will return a 403
        if(getSpot.ownerId !== getOwnerId) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        await getSpot.update(req.body)
        // json response with updated data
        return res.status(200).json(getSpot)

    } catch (error){
        next(error)
    }
});

// Delete a spot
router.delete('/:id', requireAuth, async (req, res, next) => {

    try{
      // Spot id
        const getSpotId = req.params.id;
        const getOwnerId = req.user.id;

        const spot = await Spot.findOne({
            where: {
                id: getSpotId
            }
        });

        // Ensure valid spot and ownership, If not it will send error message
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        };

        if (spot.ownerId !== getOwnerId) {  
            return res.status(403).json({ message: 'Forbidden' });
        };

        await spot.destroy();
        // If successfull, it will return success message
            return res.status(200).json({ message: "Successfully deleted" })

    } catch (error) {
        next(error)
    }
});

// Get reviews for a specific spot
router.get('/:spotId/reviews', async (req, res, next) => {
    try {
      const spotId = req.params.spotId;
      const getSpot = await Spot.findByPk(spotId)
      
      // checks spot existence
      if (!getSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      // Includes user and review images
      const getSpotReview = await Review.findAll({
        where : { spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    return res.status(200).json({ Reviews: getSpotReview });
  } catch (error) {
    next(error);
  }
});


// Create a review for a spot
router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res, next) => {
        try {
          const spotId = req.params.spotId;
          const userId = req.user.id;
          const { review, stars } = req.body;

          const spot = await Spot.findByPk(spotId);

          // Validates spots existence
          if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
          }

          // Prevent duplicate reviews from same user
          const existingReview = await Review.findOne({
            where: { userId, spotId }
          });

          if (existingReview) {
            return res.status(500).json({ message: "User already has a review for this spot" });
          }

          // create and return new review
          const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
          });

          return res.status(201).json(newReview);

        } catch (error) {
          next(error);
        }
      });

module.exports = router;
