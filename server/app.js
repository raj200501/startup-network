const express = require('express');
const path = require('path');
const requestId = require('./middleware/requestId');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const { ApiError } = require('./lib/apiError');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const createApp = () => {
  const app = express();

  app.use(express.json({ extended: false }));
  app.use(requestId());

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    });
  });

  app.get('/api/meta', (req, res) => {
    const packageJson = require(path.resolve(__dirname, '..', 'package.json'));
    res.json({
      version: packageJson.version,
      environment: process.env.NODE_ENV || 'development',
      features: {
        realtimeFeed: false,
        darkMode: true,
        rateLimitedAuth: true,
        experimentalProfiles: false
      },
      requestId: req.requestId
    });
  });

  app.use(
    '/api/users',
    rateLimiter({ windowMs: 60 * 1000, max: 25 }),
    usersRouter
  );
  app.use(
    '/api/auth',
    rateLimiter({ windowMs: 60 * 1000, max: 30 }),
    authRouter
  );
  app.use('/api/posts', postsRouter);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }

  app.use((req, res, next) => {
    next(
      new ApiError(404, 'not_found', 'Route not found', {
        path: req.originalUrl
      })
    );
  });

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
