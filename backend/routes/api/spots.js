//need to import router, need to create router
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// get all spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll();
    res.json({ spots });
});

// Get spots owned by the current user
router.h=get("/current", requireAuth, async (req, res) => {
    const spots = await Spot.findAll({ where: { ownerId: req.user.id } });
    res.json({ spots });
});

// Get details for specific spot 
router.get("/:id", async (req, res) => {
    const spots = await Spot.finaAll({ where: { ownerId: req.user.id } });
    if (!spot) return res.status(404).json({ error: "Spot not found" });
    res.json({ spot });
});

// Create a new spot
router.post("/", requireAuth, async (req, res) => {
    const { name, description, price } = req.body;
    const newSpot = await Spot.create({ name, description, price, ownerId: req.user.id });
    res.status(201).json({ spot: newSpot });
});

// Add an image to a spot
router.post("/:id/images", requireAuth, async (req, res) => {
    const { url } = req.body;
    const image = await SpotImage.create({ spotId: req.params.id, url });
    res.status(201).json({ image })
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



// export router
module.exports = router;