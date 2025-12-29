# ADR 0002: API Error Schema

## Status
Accepted

## Context
Server errors were inconsistent across routes. Clients need predictable responses for handling validation and authorization failures.

## Decision
Adopt a centralized error handler returning a consistent JSON schema containing a message, code, details, and request ID. Update routes and middleware to throw structured errors.

## Consequences
- Client error handling becomes simpler and uniform.
- Slightly more code in server routes to raise `ApiError` instances.
- Logs are easier to trace due to request IDs.
