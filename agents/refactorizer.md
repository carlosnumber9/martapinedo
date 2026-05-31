# Refactorizer

Use this note for refactoring work in this repository: code readability, file organization, TypeScript robustness, component boundaries, standardization, and maintainable structure.

## Refactoring Posture

- Preserve the current user experience, visual design, accessibility, translations, cookie consent, analytics, and legal behavior.
- Improve the code without turning the refactor into a broad rewrite.
- Prefer small, measurable changes that make the next maintenance task easier.
- Read the surrounding implementation before moving code, extracting helpers, or changing boundaries.
- Keep refactors aligned with Next.js, TypeScript, Tailwind, SSR, and the existing application architecture.

## SSR And Client Boundaries

- Maximize server-rendered stable markup when data is already available in an async route or server component.
- Keep client components focused on browser-only behavior: refs, observers, animations, GSAP timelines, direct user interaction, and DOM APIs.
- Do not weaken the UI or motion quality just to increase SSR. Preserve polished animations and interaction where they add product value.
- When a feature needs both SSR and animation, pass prepared serializable data into a narrow client component instead of recalculating content after hydration.
- Avoid hydration-time layout decisions when CSS, server data, or stable initial props can express the same behavior.

## Separation Of Responsibilities

- Move reusable UI into `components/` when the extraction clarifies the route and does not create overengineering.
- Move data shaping, parsing, mapping, and reusable business logic into `utils/` or feature-specific helper files.
- Keep CMS request logic in a dedicated place instead of scattering query details through UI components.
- Keep styles in Tailwind classes and existing Tailwind theme tokens wherever possible.
- Keep route files focused on routing, metadata, data orchestration, and composition.
- Avoid extracting a helper or component when the indirection makes a simple flow harder to read.

## Standardization And Componentization

- Reuse existing components, hooks, helpers, and styling conventions before adding new ones.
- Componentize repeated UI patterns when at least two places share the same behavior or visual contract.
- Prefer component APIs that describe intent, not implementation details or arbitrary class plumbing.
- Introduce constants for repeated values: style tokens, dimensions, animation timings, route fragments, CMS field names, limits, labels, and configuration values.
- Do not constantize a one-off value unless it represents a domain rule or likely source of drift.
- Keep both locales consistent when refactors touch user-facing text.

## TypeScript Robustness

- Lean into TypeScript at module boundaries: props, CMS responses, utility inputs and outputs, event handlers, refs, and public helper APIs.
- Avoid `any`. Use explicit domain types, React types, DOM types, and library-provided types.
- Prefer readable, durable types over clever generic-heavy models.
- Model constrained states with unions when that makes impossible states harder to express.
- Keep optional fields intentional and handle nullable CMS data explicitly.
- Let inference work inside small functions, but type exported functions and reusable component boundaries clearly.

## Readability

- Prefer clear names over terse names. Long, understandable variable and method names are better than short mysterious ones.
- Keep files short enough to scan comfortably. Prefer multiple focused files over manuscript-sized modules.
- Split a file when it mixes unrelated responsibilities, grows difficult to navigate, or hides reusable pieces inside a route.
- Keep functions focused on one job and name them after the domain behavior they express.
- Add comments only when they explain a complex flow, non-obvious constraint, or important tradeoff.
- Delete dead code, duplicate branches, and obsolete comments when the refactor makes them unnecessary.

## Safe Refactor Workflow

- Identify the current behavior before changing structure.
- Move code first, then change behavior only when the request requires it.
- Keep commits or patches scoped to the affected feature area.
- Run `npm run lint` after code changes.
- Run `npm run build` when practical after changes to routing, rendering, data fetching, shared components, Tailwind config, or TypeScript types.
- For user-facing refactors, manually check the affected routes and relevant responsive breakpoints.
