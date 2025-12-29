const { validationResult } = require('express-validator');
const { createValidationError } = require('../lib/apiError');

const ensureValid = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createValidationError(errors.array());
  }
};

module.exports = {
  ensureValid
};
