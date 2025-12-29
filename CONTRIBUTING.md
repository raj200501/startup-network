# Contributing

Thanks for contributing to Startup Network!

## Getting started
1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Run the full pipeline: `npm run verify`

## Development workflow
- Keep changes scoped and documented.
- Update tests with any functional change.
- Regenerate SVG previews with `npm run previews:svg`.

## Pull request checklist
- [ ] Tests and smoke checks are green (`npm run verify`).
- [ ] SVG previews are up to date in `docs/screenshots/`.
- [ ] Documentation reflects new behavior.

## Code style
- Use the existing UI components under `client/src/ui`.
- Keep server errors consistent with the API schema.
- Avoid deleting existing files for compatibility.
