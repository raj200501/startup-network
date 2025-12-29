const jwt = require('jsonwebtoken');
const config = require('config');
const { createAuthError } = require('../lib/apiError');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return next(createAuthError('No token, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    return next();
  } catch (err) {
    return next(createAuthError('Token is not valid'));
  }
};
