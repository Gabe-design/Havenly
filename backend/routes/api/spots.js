//need to import router, need to create router
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// get all spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll();
    res.json({ spots });
});

// Get spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
    const spots = await Spot.findAll({ where: { ownerId: req.user.id } });
    res.json({ spots });
});

// Get details for specific spot 
router.get('/:id', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id, {
        include: [{ model: SpotImage }, 
        { model: User, as: 'Owner' }]
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    return res.json(spot);
});

// Create a new spot
router.post("/", requireAuth, async (req, res) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201).json(newSpot);
    } catch (err) {
        console.error(" Error Creating Spot:", err);
        res.status(400).json({ title: "Validation error", message: err.message, errors: err.errors });
    }
});

// Add an image to a spot
router.post("/:id/images", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    if (!spot) return res.status(404).json({ message: "Spot not found" });

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You do not own this spot" });
    }

    const { url } = req.body;
    const image = await SpotImage.create({ spotId: req.params.id, url });
    res.status(201).json(image);
});

// Edit a spot
router.put("/:id", requireAuth, async (req, res) => {
    const { name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.id);
    if (!spot) return res.status(404).json({ error: "Spot not found" });

    await spot.update({ name, description, price });
    res.json({ spot });
})

// Delete a spot
router.delete("/:id", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    if (!spot) return res.status(404).json({ error: "Spot not found" });

    await spot.destroy();
    res.json({ message: "Spot deleted successfully" });
});

// avg rating and preview image
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        attributes: [
            "id", 
            "ownerId",
            "name", 
            "city",
            "state",
            "country",
            "price",
            "avgRating",
            "prviewImage"
        ]
    });

    res.json({ spots });
});

// export router
module.exports = router;