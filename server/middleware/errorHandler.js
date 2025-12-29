const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const normalizedError = (() => {
    if (err.name === 'CastError') {
      return {
        status: 400,
        code: 'invalid_identifier',
        message: 'Invalid identifier',
        details: { field: err.path }
      };
    }

    if (err.name === 'ValidationError') {
      return {
        status: 400,
        code: 'validation_error',
        message: 'Validation failed',
        details: { errors: Object.values(err.errors).map((item) => item.message) }
      };
    }

    return null;
  })();

  const status = normalizedError?.status || err.status || 500;
  const code = normalizedError?.code || err.code || 'internal_error';
  const message =
    normalizedError?.message || err.message || 'Unexpected server error';
  const details = normalizedError?.details || err.details || null;
  const requestId = req.requestId || null;

  const payload = {
    error: {
      message,
      code,
      details,
      requestId
    }
  };

  if (details && details.errors) {
    payload.errors = details.errors;
  }

  return res.status(status).json(payload);
};

module.exports = errorHandler;
