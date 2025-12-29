# Security Policy

## Reporting a vulnerability
Please report security issues privately to security@startup-network.local. Include steps to reproduce and impact analysis.

## Supported versions
We support the latest minor release on the main branch.

## Security practices
- JWT secrets are injected via environment variables.
- Rate limiting is applied to authentication routes.
- All API errors are normalized and logged with request IDs.
