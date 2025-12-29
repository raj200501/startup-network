# ADR 0001: UI Component System

## Status
Accepted

## Context
The UI required a premium look without introducing risky dependencies. Existing CSS classes were inconsistent and difficult to scale.

## Decision
Introduce a bespoke UI system under `client/src/ui` that includes buttons, cards, inputs, tabs, modals, drawers, toasts, and skeletons. Define global theme tokens and support light/dark mode with persisted preference.

## Consequences
- Consistent styling across the app.
- Faster iteration on layout and accessibility.
- Slightly more maintenance in-house, but no new dependencies.
