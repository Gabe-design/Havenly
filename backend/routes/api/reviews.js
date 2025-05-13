// backend/routes/api/review.js

const express = require( 'express' );
// const bcrypt = require( 'bcryptjs' );
const { check } = require( 'express-validator' );
const { handleValidationErrors } = require( '../../utils/validation' );
const { requireAuth } = require( '../../utils/auth' );
// const { setTokenCookie, requireAuth } = require( '../../utils/auth' );
const { User, Spot, SpotImage, Review, ReviewImage } = require( '../../db/models' );
const { Op } = require( 'sequelize' );

const router = express.Router();

// Validation middleware for posting/editing reviews
const validateReviews = [
    check( 'review' )
        .exists({ checkFalsy: true })
        .withMessage( "Review text is required" ),
    check( 'stars' )
        .exists({ checkFalsy: true })
        .withMessage( "Stars must be an integer from 1 to 5" ),
    handleValidationErrors
];

// Get all reviews by the current user
router.get( '/current', requireAuth, async ( req, res, next ) => {
    const getUserId = req.user.id
    try {
        const allReviews = await Review.findAll({
            where: { userId: getUserId },
            include: [
                {
                    model: User,
                    attributes: [ 'id', 'firstName', 'lastName' ]
                },
                {
                    model: Spot,
                    attributes: [ 'id','ownerId','address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ],
                    include: [
                        {
                            model: SpotImage,
                            attributes: [ 'url' ],
                            where: { preview: true },
                            // Makes the SpotImage optional
                            required: false
                        }
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: [ 'id', 'url' ]
                }
            ]
        });

        // Format review data to unclude preview image
        const extractReviewData = allReviews.map( review => {
            const reviewsCurrent = review.toJSON();

            let previewImageUrl = null;

            if( reviewsCurrent.Spot && reviewsCurrent.Spot.SpotImage && reviewsCurrent.Spot.SpotImages.length > 0 ) {
                previewImageUrl = reviewsCurrent.Spot.SpotImage[ 0 ].url;
            }

            delete reviewsCurrent.Spot.previewImage

            return reviewsCurrent;
        });

        res.status( 200 ).json({ Reviews: extractReviewData })
    }
    catch ( error ) {
        next( error )
    };
});

// Add image to review
router.post( '/:reviewId/images', requireAuth, async ( req, res, next ) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const { url } = req.body;
    try{
        // Verify review exists
        const getReviewImages = await Review.findByPk( reviewId )

        if( !getReviewImages){
            return res.status( 404 ).json({ message: "Review couldn't be found" })
        }

        // Confirm the review belongs to the current user
        if( getReviewImages.userId !== userId ){
            return res.status( 403 ).json({ message: 'Forbidden access' })
        }

        // Enforce max 10 images per review
        const reviewImageCount = await ReviewImage.count({
            where: { reviewId }
        });

        if( reviewImageCount >= 10 ) {
            return res.status( 403 ).json({ message: "Maximum number of images for this resource was reached" });
        }

        // Create a new review image record
        const newImage = await ReviewImage.create({
            reviewId,
            url
        });
        return res.status( 201 ).json({
            id: newImage.id,
            url: newImage.url
        });

    } catch ( error ) {
        next( error )
    }
});


// Edit a Review
router.put( '/:reviewId', requireAuth, validateReviews, async ( req, res, next ) => {

    try {
        const getReviewId = req.params.reviewId;
        const getUserId = req.user.id
        const { review, stars } = req.body;

        const findEditReview = await Review.findByPk( getReviewId );

        // Check if review exists
        if( !findEditReview ) {
            return res.status( 404 ).json({ message: "Review couldn't be found" })
        }
        
        // Ensure the current user owns the review
        if ( findEditReview.userId !== getUserId ) {
            return res.status( 403 ).json({ message: 'Forbidden access' });
        }

        // Update review content
        await findEditReview.update({
            review, stars
        });

        return res.status( 200 ).json( findEditReview )
    } catch ( error ) {
        next( error )
    }
});

// Remove a review from the db
router.delete( '/:reviewId', requireAuth, async ( req, res, next ) => {

    try{

        const reviewId = req.params.reviewId;
        const userId = req.user.id;

        // Find review to be deleted
        const getReview = await Review.findOne({
            where: { id: reviewId }
        });

        if (!getReview){
            return res.status( 404 ).json({ message: "Review couldn't be found" })
        }

        // Ensure only the user can delete their review
        if (getReview.userId !== userId) {
            return res.status( 403 ).json({ message: "Forbidden: You don't own this review" });
          }

        await getReview.destroy();
        return res.status( 200 ).json({ message: "Successfully deleted" });
    } catch ( error ) {
        next( error )
    }

});

module.exports = router;