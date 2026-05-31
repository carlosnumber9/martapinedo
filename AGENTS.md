# Agent Notes: Next.js Performance Review

This project should be treated with care: keep the app healthy, preserve the current user experience, and improve performance incrementally. Prefer small, measurable changes over broad refactors. When optimizing, verify that accessibility, translations, cookie consent behavior, legal content, analytics, and visual design still work as expected.

## Role

Act as a Next.js + TypeScript performance specialist. Focus especially on Core Web Vitals, CLS, hydration stability, media loading, font behavior, and production observability.

## Current Context

- Vercel Speed Insights showed weak desktop Real Experience Score, mainly due to CLS.
- The bad desktop CLS sample points to `/legal` with `CLS 0.45`.
- The dataset is very small: about 4 total data points, and `/legal` appears to have only 1 data point.
- Home `/` appears healthy in the Vercel sample, around `CLS 0.06`.
- Mobile RES appears unavailable or incomplete, likely because there is not enough Speed Insights data.
- Speed Insights and Analytics are loaded only after cookie consent, so real-user data may be sparse and biased toward consenting users.

## General Principles

- Do not degrade the look and feel while improving metrics.
- Avoid speculative rewrites unless a measurement or code smell justifies them.
- Prefer server-rendered stable markup over client-only layout decisions.
- Reserve dimensions for media, third-party widgets, banners, and dynamically loaded content.
- Avoid layout-affecting changes during hydration.
- Animate with `transform` and `opacity`, not layout properties.
- Keep cookie/legal behavior correct and privacy-friendly.
- Keep translations in `messages/es.json` and `messages/en.json` consistent.
- Run `npm run lint` and, when practical, `npm run build` after changes.

## Pending Review Items

### 1. `/legal` CLS Investigation

- `app/legal/page.tsx`
- `components/CookieConsentToggle.tsx`
- `components/CookieConsentBanner.tsx`

Review:

- `/legal` is the only path reported as poor in the current Vercel sample.
- `CookieConsentToggle` reads cookie state on the client and may change button text after hydration.
- The initial render can show the accept text, then switch to reject text if consent already exists.
- This can change button width and cause a small layout shift.

Possible improvements:

- Give the toggle button a stable width or min-width.
- Make the initial consent state deterministic from server/cookie data if possible.
- Avoid text/size changes that affect layout after hydration.
- Test `/legal` with no cookie, accepted cookie, and declined cookie.

### 2. Cookie Banner Flash

- `components/CookieConsentBanner.tsx`

Review:

- The banner starts visible and checks existing preference in `useEffect`.
- If a preference exists, it disappears after hydration.
- It is `fixed`, so it should not push layout, but it can create visual instability and may affect perceived performance.

Possible improvements:

- Avoid rendering the banner until cookie preference is known.
- Or read cookie state earlier and render the correct initial state.
- Keep the banner fixed/non-layout-affecting.
- Ensure accept/decline behavior still dispatches `COOKIE_CONSENT_EVENT`.

### 3. Blog Post Client-Only Body Rendering

- `components/Post.tsx`

Review:

- `cleanHTML` starts as an empty string.
- The full post body is sanitized and inserted later in `useEffect`.
- This means the article initially renders without body content, then expands after hydration.
- This is a strong CLS risk for blog post pages.

Possible improvements:

- Sanitize the post HTML before render, preferably on the server.
- Pass already-clean HTML into the component.
- Render body content in the first HTML payload.
- Keep `TableOfContents` behavior compatible with the new rendering path.

### 4. Blog Post Images

- `components/Post.tsx`
- `utils/posts.ts`

Review:

- Sanitized post HTML may include raw `<img>` tags.
- `width` and `height` are allowed, but external content may omit them.
- Images without reserved dimensions can cause large CLS when they load.

Possible improvements:

- Ensure post images include width/height or aspect-ratio.
- Add CSS rules for prose images that preserve aspect ratio and reserve space where possible.
- Consider transforming known CMS image data into `next/image` usage if feasible.
- Confirm GraphCMS/Graphassets content has predictable dimensions.

### 5. Font Swap and Text Reflow

- `utils/fonts.ts`

Review:

- Fonts use `display: 'swap'`.
- This is generally good for speed, but text-heavy pages like `/legal` may reflow when custom fonts replace fallback fonts.

Possible improvements:

- Review whether fallback metrics are close enough.
- Consider `adjustFontFallback` if supported by the current Next/font setup.
- Inspect `/legal` for text wrapping changes during font load.
- Keep readability and brand feel intact.

### 6. Home Hydration Layout Decisions

- `components/Header.tsx`
- `components/Marta.tsx`
- `app/page.tsx`

Review:

- Landscape/mobile layout is decided in `useEffect` using `window.innerWidth > window.innerHeight`.
- Initial server/client render may differ from final hydrated layout.
- This can cause layout shifts, especially around hero composition.
- Current Vercel data for `/` looks good, so this is not the first priority.

Possible improvements:

- Prefer CSS media/container queries over client state for layout.
- Avoid changing width, alignment, or margins after hydration.
- Keep GSAP animations limited to `transform` and `opacity`.

### 7. Scrollbar and Width Stability

- `app/page.tsx`
- `app/blog/page.tsx`

Review:

- Some layouts use `w-screen` or custom scroll containers.
- `w-screen` can create horizontal overflow when vertical scrollbars are present.
- Horizontal overflow or scrollbar appearance can create minor layout instability.

Possible improvements:

- Prefer `w-full` where viewport width is not required.
- Check for horizontal overflow on desktop and mobile.
- Ensure fixed nav/footer do not trigger width jumps.

### 8. Contact Form Third-Party Widget

- `components/ContactForm.tsx`

Review:

- Turnstile is wrapped in a fixed-height `h-[65px]` container, which is good.
- Keep this reserved space if refactoring.

Possible improvements:

- Verify the widget never exceeds the reserved area.
- Keep loading/error states height-stable.

### 9. Analytics Data Quality

- `components/AnalyticsProvider.tsx`

Review:

- Vercel Analytics and Speed Insights render only after cookie consent.
- This may explain low data volume and missing mobile RES.
- Performance conclusions should account for this sparse sample.

Possible improvements:

- Keep consent compliance as the priority.
- When evaluating metrics, use Lighthouse/WebPageTest/local profiling in addition to Vercel RUM.
- Wait for more production data before declaring a regression fixed or unfixed.

## Suggested Validation Workflow

- Test `/legal`, `/`, `/contact`, `/blog`, and at least one `/blog/[id]`.
- Test desktop and mobile viewports.
- Test with no consent cookie, accepted cookie, and declined cookie.
- Use Chrome DevTools Performance or Lighthouse to inspect layout shifts.
- In production, watch Vercel Speed Insights by route, metric, percentile, country, and selector.
- Treat Vercel samples below 20-30 visits per path as directional, not definitive.
