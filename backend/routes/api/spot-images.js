// backend/routes/api/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { OP } = require('sequelize')


const router = express.Router();

// Delete a spot image
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    try{

        // Extract image Id from req parameters
        const getImageId = req.params.imageId;
        // Extract user Id from authenticated req
        const getUserId = req.user.id;

        // Find image by Id and include its related spot to ownership check
        const findImageId = await SpotImage.findOne({
        where: {
            id: getImageId
        },
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    // If image doesn't exist, send 404 response
    if(!findImageId) {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }

    // If current user is not owner of the spot, forbid deletion
    if(findImageId.Spot.ownerId !== getUserId){
        return res.status(403).json({ message: 'Forbidden' })
    }

    // Delet the image
    await findImageId.destroy();

    // Returns success response
    return res.status(200).json({ message:  "Successfully deleted" })
    } catch (error){
        // Passes any errors to the global error handler
        next(error)
    }
});



module.exports = router;
