const { ApiError } = require('../lib/apiError');

const defaultKeyGenerator = (req) => req.ip;

const rateLimiter = ({
  windowMs = 60 * 1000,
  max = 20,
  keyGenerator = defaultKeyGenerator
} = {}) => {
  const bucket = new Map();

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const record = bucket.get(key);

    if (!record || record.resetAt <= now) {
      const resetAt = now + windowMs;
      bucket.set(key, { count: 1, resetAt });
      res.setHeader('RateLimit-Limit', String(max));
      res.setHeader('RateLimit-Remaining', String(max - 1));
      res.setHeader('RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
      return next();
    }

    if (record.count >= max) {
      const retryAfter = Math.max(record.resetAt - now, 0);
      res.setHeader('RateLimit-Limit', String(max));
      res.setHeader('RateLimit-Remaining', '0');
      res.setHeader('RateLimit-Reset', String(Math.ceil(record.resetAt / 1000)));
      res.setHeader('Retry-After', String(Math.ceil(retryAfter / 1000)));
      return next(
        new ApiError(429, 'rate_limited', 'Too many requests', {
          retryAfterMs: retryAfter
        })
      );
    }

    record.count += 1;
    bucket.set(key, record);
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(Math.max(max - record.count, 0)));
    res.setHeader('RateLimit-Reset', String(Math.ceil(record.resetAt / 1000)));
    return next();
  };
};

module.exports = rateLimiter;
