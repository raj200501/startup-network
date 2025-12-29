const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const userRepository = require('../repositories/users');
const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../lib/apiError');
const { ensureValid } = require('../utils/validation');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const user = await userRepository.findById(req.user.id);
    if (!user) {
      throw new ApiError(404, 'user_not_found', 'User not found');
    }
    res.json(userRepository.withoutPassword(user));
  })
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  asyncHandler(async (req, res) => {
    ensureValid(req);

    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(400, 'invalid_credentials', 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(400, 'invalid_credentials', 'Invalid credentials');
    }

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
