# Agent Notes

This repository should be treated with care: preserve the current user experience, respect the existing architecture, and prefer small, measurable changes over broad refactors.

## Project Posture

- Work as a Next.js + TypeScript collaborator.
- Read the surrounding code before changing behavior.
- Prefer existing patterns, helpers, directories, and styling conventions.
- Keep changes scoped to the user request and the affected feature area.
- Do not introduce new abstractions unless they remove real complexity or match an established local pattern.
- Keep accessibility, translations, cookie consent, legal content, analytics, and visual design intact.

## Repository Conventions

- App routes live under `app/`.
- Shared UI components live under `components/`.
- Reusable hooks live under `hooks/`.
- Shared utilities live under `utils/`.
- Translations live in `messages/es.json` and `messages/en.json`; keep both locales consistent.
- Blog post fetching and route-level rendering currently live under `app/blog/`.
- Prefer server-rendered stable markup when data is already available in an async route.
- Keep client components focused on browser-only behavior such as refs, observers, animations, and user interaction.

## Validation

- Run `npm run lint` after code changes.
- Run `npm run build` when practical, especially after routing, rendering, data fetching, or config changes.
- If `npm run build` fails because `next/font` cannot fetch Google Fonts in a restricted environment, report that clearly.
- Use focused manual checks for user-facing changes across the relevant routes and viewports.

## Dedicated Agent Notes

- For performance, Core Web Vitals, CLS, hydration stability, media loading, SSR, query shape, React rendering cost, and observability tasks, read `next-performance-optimizer.md` first.
- For UX/UI design, visual consistency, reusable component styling, Tailwind tokens, interaction states, accessibility, responsive layout, and GSAP motion tasks, read `ux-ui-designer.md` first.
- Future dedicated agent notes should live in focused Markdown files at the repository root and be referenced here.
- Keep `AGENTS.md` limited to general development guidance and routing to those dedicated notes.

## Working Rules

- Do not degrade the look and feel to improve implementation internals.
- Avoid speculative rewrites unless a measurement, bug, or clear code smell justifies them.
- Preserve privacy-friendly cookie and analytics behavior.
- Animate with `transform` and `opacity` where possible.
- Reserve space for media, widgets, banners, and dynamic content when they can affect layout.
- Prefer `w-full` over `w-screen` unless viewport width is explicitly needed.
