const crypto = require('crypto');

const requestId = () => (req, res, next) => {
  const incomingId = req.header('x-request-id');
  const id = incomingId && incomingId.trim() ? incomingId : crypto.randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
};

module.exports = requestId;
