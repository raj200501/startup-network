# ADR 0003: SVG Previews for Visual Proof

## Status
Accepted

## Context
Binary assets cannot be committed, yet visual proof of UI changes is required in the repository.

## Decision
Generate SVG previews with a script (`tools/generate_svg_previews.mjs`) and commit the text-based SVGs to `docs/screenshots/`. Embed them in the README.

## Consequences
- Previews are versioned and diffable.
- No binary artifacts are introduced.
- Requires running `npm run previews:svg` when UI changes.
