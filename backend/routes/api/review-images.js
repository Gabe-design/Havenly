// backend/routes/api/review-images.js

const express = require('express');

const router = express.Router();

// Middleware for requiring authentication
const { requireAuth } = require('../../utils/auth');

// Sequelize models 
const { Review, ReviewImage } = require('../../db/models');

// Delete a review image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {
      // Id of the review image to delete
        const imageId = req.params.imageId;
        // Authenticated users Id
        const userId = req.user.id;

        // Find the image and include the associated review
        const reviewImage = await ReviewImage.findByPk(imageId, {
          include: { model: Review }
        });

        // If the image does not exist, returns a 404
        if (!reviewImage) {
          return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        // Ensure the user owns the review before deleting
        if (reviewImage.Review.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You don't own this review" });
        }

        // Delete the review image
        await reviewImage.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
    }
    catch (error){
        next(error);
    }
  });


module.exports = router;
