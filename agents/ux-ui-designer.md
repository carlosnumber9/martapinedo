# UX UI Designer

Use this note for UX/UI design work in this repository: visual consistency, component ergonomics, reusable styling, interaction states, accessibility, responsive behavior, and motion design.

## Current Product Language

- Preserve the current dark, editorial look and feel: `darkPrimary`, `darkSecondary`, white text with opacity, and `blueSecondary` as the main accent.
- Keep typography aligned with the configured Tailwind font families: `font-main` for strong display moments, `font-subtitle` for navigation/supporting emphasis, and `font-body` for reading.
- Respect the existing rectangular, border-led style. Avoid adding highly rounded cards, decorative blobs, generic gradients, or visual flourishes that do not already belong to the app.
- Keep layouts immersive and content-first. Do not replace the app experience with marketing-style sections unless the route already works that way.
- Prefer `w-full` over `w-screen` unless viewport width is explicitly required.

## Design Principles

- Start from the surrounding UI before changing a component: nearby spacing, colors, hover states, typography, breakpoints, and animation timing define the local contract.
- Favor consistency and standards: users should not have to relearn button behavior, link styling, menu placement, form states, or navigation cues.
- Keep important system status visible: loading, submitting, disabled, success, and error states should be clear and stable.
- Reduce memory burden: visible labels, familiar controls, clear hierarchy, and direct affordances are better than hidden rules or instructions.
- Prevent errors first, then write helpful errors in plain language when prevention is not possible.
- Keep visual design focused on the user's task. Every decorative element should earn its place.
- Use accessibility as a design constraint, not a final checklist.

## Tailwind And Tokens

- Prefer the existing Tailwind theme values in `tailwind.config.js` before adding new one-off classes.
- When a measurement, color, shadow, animation, or typography choice repeats, consider moving it into Tailwind config or a small shared component pattern.
- Do not constantize prematurely: extract tokens when there is real repetition, design drift, or a clear component family.
- Keep both semantic intent and Tailwind ergonomics in mind. A reusable class or component should make the next change simpler, not hide important layout behavior.
- Use existing colors first:
  - `darkPrimary` for the app background and deep surfaces.
  - `darkSecondary` for panels, nav, cards, and secondary surfaces.
  - `bluePrimary` for deep blue accents where already established.
  - `blueSecondary` for primary accents, borders, active nav, links, and strong calls to action.
  - `reddy` only where it fits the existing visual language and does not confuse error semantics.
- Keep spacing predictable. Prefer Tailwind scale values already common in the repo (`px-6`, `p-8`, `gap-4`, `gap-5`, `h-14`, `h-20`) unless the component needs a specific stable dimension.

## Components

- Look for an existing component before adding a new one, especially for buttons, navigation, posts, consent UI, loaders, forms, and route states.
- Standardize repeated controls into reusable components when at least two places need the same behavior or visual contract.
- Keep shared components configurable by intent, not by exposing every Tailwind class as a prop.
- Preserve translations when moving or reusing text. Update both `messages/es.json` and `messages/en.json` when copy changes.
- Keep client components limited to browser-only behavior: refs, observers, animation, menus, and direct user interaction.
- Prefer server-rendered stable markup when data is already available in a route.

## TypeScript In UI Components

- Use TypeScript deliberately in components: strong props, explicit domain types, typed callbacks, and safe state models should make UI changes easier to trust.
- Prefer readable types over clever types. Robustness matters, but avoid generic-heavy or deeply nested types that make simple components hard to scan.
- Model visual variants with small union types when they clarify allowed states, such as button intent, size, alignment, loading state, or active route state.
- Type reusable component props at the boundary, then let inference do useful work inside the component.
- Avoid `any` for UI data, CMS fields, events, refs, and GSAP timelines. Use specific React, DOM, or library types when available.
- Keep optional props intentional. Provide defaults close to the component and avoid ambiguous combinations that create impossible visual states.
- When extracting shared components, type the public API for the design contract, not the implementation detail.

## Interaction States

- Every interactive element needs visible default, hover, focus-visible, active/current, disabled, loading, and error/success states where applicable.
- Use clear focus styles that work on the dark background and do not rely on color alone.
- Buttons and links should keep stable dimensions across state changes to avoid layout shift.
- Form fields should preserve current minimal styling while making validation and required states understandable.
- For destructive or privacy-affecting actions, preserve consent behavior and make the consequence explicit.

## Motion And GSAP

- Continue using GSAP for richer existing motion patterns when the interaction benefits from timelines, refs, or orchestration.
- Keep simple state transitions in Tailwind/CSS when no timeline is needed.
- Animate `transform` and `opacity` whenever possible; avoid animating layout properties.
- Motion should clarify hierarchy, continuity, or feedback. Avoid animation that delays reading, navigation, or form completion.
- Keep timings restrained and consistent with current UI: short transitions around 200-300ms for hover/state changes, longer only for deliberate entrance choreography.
- Always consider reduced motion. When adding significant animation, support `prefers-reduced-motion` or a graceful static equivalent.
- Clean up GSAP contexts/timelines in hooks and client components to avoid leaks and stale DOM references.

## Responsive And Layout

- Design mobile and desktop together. Check that text wraps cleanly, buttons do not overflow, and fixed elements do not cover content.
- Reserve stable space for media, forms, banners, widgets, loaders, and dynamic content that can affect layout.
- Avoid horizontal overflow. Be especially careful with fixed elements, `w-screen`, transforms, scaled hover states, and long words.
- Use stable dimensions for repeated cards, icon areas, loaders, menu rows, and CTAs when state changes could otherwise resize them.
- Keep blog reading layouts legible: line length, heading scale, image sizing, and table of contents placement matter more than decorative density.

## Accessibility And UX Checks

- Use semantic HTML first: headings in order, `button` for actions, `a`/`Link` for navigation, labels for form controls, and `time` for dates.
- Maintain sufficient contrast for text, borders, links, focus rings, and disabled states.
- Do not rely on hover-only information. Touch and keyboard users need equivalent access.
- Preserve keyboard navigation through menus, language switching, forms, cookie controls, and blog navigation.
- Check common UX heuristics before shipping: visibility of status, user control, consistency, error prevention, recognition over recall, and minimalist focus.
- Use WCAG 2.2 as the accessibility baseline for interaction, focus appearance, target size, forms, and motion sensitivity.

## External References

- Nielsen Norman Group, "10 Usability Heuristics for User Interface Design": https://www.nngroup.com/articles/ten-usability-heuristics/
- W3C WAI, "How to Meet WCAG 2.2": https://www.w3.org/WAI/WCAG22/quickref/
- Material Design, "Motion": https://m2.material.io/design/motion/understanding-motion.html

## Validation Workflow

- Compare the changed UI with adjacent routes/components before and after the edit.
- Test the relevant route at mobile and desktop widths.
- Verify keyboard navigation and focus-visible states.
- Check hover/touch states, loading states, empty states, and long translated text.
- Run `npm run lint` after code changes.
- Run `npm run build` when the change affects routing, rendering, shared components, Tailwind config, or layout stability.
- For visual changes, perform a focused manual browser check and note any viewport or animation risks.
