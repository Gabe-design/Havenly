// backend/routes/api/bookings.js

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');

// GET /api/bookings/current - Get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  // Fetch all bookings for the user and include associated spot data and preview image 
  const bookings = await Booking.findAll({
    where: { userId },
    include: {
      model: Spot,
      include: {
        model: SpotImage,
        where: { preview: true },
        required: false,
        // limit to 1 preview image per spot
        limit: 1
      }
    }
  });

  // Format the booking data for response
  const result = bookings.map(booking => {
    const spot = booking.Spot;
    const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;
  
    return { 
      id: booking.id,
      spotId: spot.id,
      Spot: {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        price: spot.price,
        previewImage
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    };
  });

  return res.json({ Bookings: result });
});

module.exports = router;
