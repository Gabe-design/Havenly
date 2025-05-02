// backend/routes/api/index.js

// This is the central router file that connects all Api routes

const router = require('express').Router();

// Import each route
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js');
const reviewImagesRouter = require('./review-images.js')
const spotImagesRouter = require('./spot-images.js')
// Import authentication uttilities
const { requireAuth, restoreUser } = require('../../utils/auth');

// Test endpoint to varify authentication is working
router.get('/test', requireAuth, (req, res) => {
  res.json({ message: 'success' })
})


// Global middleware to restore user from session
// Sets req.user if valid session exits
router.use(restoreUser);

// Route bindings
// Use the imported routes with the main router
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/spot-images', spotImagesRouter);


module.exports = router;
