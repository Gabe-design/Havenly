// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { OP } = require('sequelize')


const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    try{

        const getImageId = req.params.imageId;
        const getUserId = req.user.id;

        const findImageId = await SpotImage.findOne({
        where: {
            id: getImageId
        },
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    if(!findImageId) {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }

    if(findImageId.Spot.ownerId !== getUserId){
        return res.status(403).json({ message: 'Forbidden' })
    }

    await findImageId.destroy();

    return res.status(200).json({ message:  "Successfully deleted" })

    } catch (error){
        next(error)
    }
});



module.exports = router;
