// import router, create router
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, User } = require('../../db/models');
const { validateReview } = require('../../utils/validation');

// Get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [{ model: Spot }, { model: ReviewImage }]
    });
    return res.json({ reviews });
});

// Add an image to a review 
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId, {
        include: [{ model: ReviewImage }]
    });

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You do not own this review" });
    }

    // Fix: Limit images per review to 10
    const reviewImageCount = await ReviewImage.count({ where: { reviewId: review.id } });
    if (reviewImageCount >= 10) {
        return res.status(403).json({ message: "Cannot add more than 10 images to a review" });
    }

    const newImage = await ReviewImage.create({ reviewId: review.id, url });
    return res.status(201).json(newImage);
});

// Edit a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const existingReview = await Review.findByPk(req.params.reviewId);

    if (!existingReview) return res.status(404).json({ message: "Review not found" });
    if (existingReview.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You do not own this review" });
    }
    
    await existingReview.update({ review, stars });
    return res.json(existingReview);
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You do not own this review" });
    }

    await review.destroy();
    return res.json({ message: "Review deleted successfully" });
});

// Get all reviews for a spot
router.get('/spots/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) return res.status(404).json({ message: "Spot not found" });

    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [{ model: User }, { model: ReviewImage }]
    });
    return res.json({ reviews });
});

// Create a review for a spot
router.post('/spots/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot not found" });

    const newReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    });
    return res.status(201).json(newReview);
});

// export router
module.exports = router;