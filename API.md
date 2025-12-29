# API Reference

Base URL: `/api`

## Authentication
### `POST /api/auth`
Authenticate a user and receive a JWT.

Request:
```json
{
  "email": "founder@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "<jwt>"
}
```

### `GET /api/auth`
Get the authenticated user's profile. Requires `x-auth-token` header.

Response:
```json
{
  "_id": "...",
  "name": "Founder",
  "email": "founder@example.com",
  "avatar": "..."
}
```

## Users
### `POST /api/users`
Register a new user.

Request:
```json
{
  "name": "Founder",
  "email": "founder@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "<jwt>"
}
```

## Posts
### `GET /api/posts`
List all posts. Requires `x-auth-token`.

### `POST /api/posts`
Create a post.

Request:
```json
{
  "text": "Launching our beta this Friday."
}
```

### `DELETE /api/posts/:id`
Delete a post you own.

## System
### `GET /health`
Return uptime and request ID.

### `GET /api/meta`
Return version and feature flags.

## Error schema
All errors are returned in a standard format:

```json
{
  "error": {
    "message": "Validation failed",
    "code": "validation_error",
    "details": {
      "errors": []
    },
    "requestId": "..."
  }
}
```
