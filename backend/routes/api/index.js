const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const spotImagesRouter = require('./spot-images');
const reviewImagesRouter = require('./review-images');

const { requireAuth, restoreUser } = require('../../utils/auth');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);

router.get('/', requireAuth, (req, res) => {
  res.json({ message: 'success' });
});

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;

// Uncommented code for setting token cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: { username: 'Demo-lition' }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// const { restoreUser } = require('../../utils/auth');
// router.get('/restore-user', restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// const { requireAuth } = require('../../utils/auth');
// router.get('/require-auth', requireAuth, (req, res) => {
//  return res.json(req.user);
// });

module.exports = router;
