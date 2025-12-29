# Architecture

## System overview
Startup Network is a full-stack application designed to support founders with a premium mission-control experience. It consists of:

- **Client (React + Redux)**: premium UI layer with a reusable component system, theme tokens, and state-driven pages.
- **Server (Express + MongoDB)**: REST API with authentication, posts CRUD, and system endpoints.
- **Workflow tooling**: a verification pipeline, SVG preview generator, and CI checks.

## High-level data flow
1. **User authentication**
   - Client submits credentials to `/api/auth`.
   - Server validates input, issues JWT, and returns token.
   - Client stores token and uses it on subsequent requests.

2. **Feed and posts**
   - Client requests posts from `/api/posts`.
   - Server loads posts from MongoDB, applies authorization, and returns payload.
   - Client renders feed with premium cards and status states.

3. **Health & metadata**
   - Monitoring checks `GET /health` for uptime, timestamp, and request ID.
   - `GET /api/meta` exposes version and feature flags.

## Components
- **API layer**: `server/app.js` wires middleware and routes.
- **Middleware**: request ID, rate limiter, centralized error handler.
- **Persistence**: Mongoose models under `server/models/`.
- **UI system**: components under `client/src/ui` drive consistent styling.

## Deployment model
- Development runs the client and server concurrently via `npm run dev`.
- Production builds the client and serves static assets from Express.
- CI installs dependencies and runs `npm run verify`.

## Error handling
Every server error is normalized by `server/middleware/errorHandler.js` into a consistent JSON schema:

```json
{
  "error": {
    "message": "Validation failed",
    "code": "validation_error",
    "details": {},
    "requestId": "..."
  }
}
```

## Sequence diagram (auth)
```
Client -> Server: POST /api/auth
Server -> Server: Validate credentials
Server -> Client: 200 { token }
Client -> Server: GET /api/posts (x-auth-token)
Server -> Client: 200 [posts]
```
