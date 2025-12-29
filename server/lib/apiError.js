class ApiError extends Error {
  constructor(status, code, message, details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const createValidationError = (errors) =>
  new ApiError(400, 'validation_error', 'Validation failed', { errors });

const createAuthError = (message, details = null) =>
  new ApiError(401, 'auth_error', message, details);

module.exports = {
  ApiError,
  createValidationError,
  createAuthError
};
