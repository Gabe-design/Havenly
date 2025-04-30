const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

/* Log in
router.post('/',
  validateLogin, async (req, res, next) => {
    // username and password credentails
    const { credential, password } = req.body;
    // find user by credentiasl
    const user = await User.login(credential, password);

    if (!user) {
      // error for invalid crdentials
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    // sets TokenCookie on login
    await setTokenCookie(res, user);
    // returns safe infro to user
    return res.json({ 
      user
    });
  }
);*/

// Manni's code 
router.post(
  '/',
  // this is the express validations array you created above
  validateLogin,
  async (req, res, next) => {
      // credentials username or password
    const { credential, password } = req.body;
    // helps to go around the default scope
    const user = await User.unscoped().findOne({
      where: {
          // find the info in data of either username or email
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });


  //   need to hash password
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      // if credentials fail and error will be thrown
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      // provide clear error message, but not to give sensitive info/clues for bad actors
      err.errors = { credential:  "Invalid credentials" };
      return next(err);
    }

  //   creating an obj with data that is safe exlcuding password and sencitive info
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

  //   pass obhect to settoken function this generates token
    await setTokenCookie(res, safeUser);
  //   return info to user
    return res.json({
      user: safeUser
    });
  }
);

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;

/*
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all


rm db/dev.db

"DROP SCHEMA IF EXISTS airbnb_schema CASCADE; CREATE SCHEMA airbnb_schema;"


npm run build   # runs psql-setup-script.js to ensure schema exists

npx sequelize-cli db:migrate


npx sequelize-cli db:seed:all
*/