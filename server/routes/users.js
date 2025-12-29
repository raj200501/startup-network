const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check } = require('express-validator');

const userRepository = require('../repositories/users');
const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../lib/apiError');
const { ensureValid } = require('../utils/validation');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  asyncHandler(async (req, res) => {
    ensureValid(req);

    const { name, email, password } = req.body;

    let user = await userRepository.findByEmail(email);

    if (user) {
      throw new ApiError(400, 'user_exists', 'User already exists', {
        email
      });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await userRepository.createUser({
      name,
      email,
      avatar,
      password: hashedPassword
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, signedToken) => {
          if (err) {
            return reject(err);
          }
          return resolve(signedToken);
        }
      );
    });

    res.json({ token });
  })
);

module.exports = router;
