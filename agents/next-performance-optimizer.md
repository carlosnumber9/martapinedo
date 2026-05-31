# Next Performance Optimizer

Use this note for performance work in this repository: Core Web Vitals, CLS, hydration stability, media loading, SSR, query shape, React rendering cost, and production observability.

## Current Context

- Vercel Speed Insights previously showed weak desktop Real Experience Score, mainly due to CLS.
- The poor sample pointed to `/legal` with `CLS 0.45`.
- The dataset was very small: around 4 total data points, and `/legal` appeared to have only 1 data point.
- Home `/` looked healthy in that sample, around `CLS 0.06`.
- Mobile RES appeared unavailable or incomplete, likely because there was not enough Speed Insights data.
- Vercel Analytics and Speed Insights render only after cookie consent, so RUM data may be sparse and biased toward consenting users.

## General Performance Rules

- Prefer server-rendered stable markup over client-only layout decisions.
- Avoid layout-affecting changes during hydration.
- Reserve dimensions for media, third-party widgets, banners, and dynamically loaded content.
- Animate using `transform` and `opacity`, not layout properties.
- Treat Vercel samples below 20-30 visits per path as directional, not definitive.
- Validate suspected CLS locally with Chrome DevTools Performance or Lighthouse, then watch production by route and selector.

## Recently Improved

### Blog Post Body Rendering

- Files: `app/blog/[id]/page.tsx`, `components/Post.tsx`, `utils/posts.ts`.
- The post body is now sanitized on the server with `getCleanPostBody`.
- `PostContent` receives `cleanHTML` as a prop instead of building it from `useEffect`.
- This avoids initially rendering an empty article and expanding it after hydration.

### Blog Post Table Of Contents

- Files: `app/blog/[id]/page.tsx`, `components/TableOfContents.tsx`, `hooks/useTableOfContents.ts`, `utils/posts.ts`.
- Headings are now extracted from sanitized HTML on the server with `extractHeadingsFromHTML`.
- `TableOfContents` receives serializable heading data.
- The hook now only handles browser-only active-heading observation with `IntersectionObserver`.

### Blog Post Images

- Files: `components/Post.tsx`, `utils/posts.ts`.
- Sanitized post HTML preserves image `width` and `height`.
- Hygraph Rich Text images have been manually confirmed in DevTools to include the dimensions configured in Hygraph.
- Sanitization adds `loading="lazy"` and `decoding="async"` to post images.
- Prose images use stable sizing classes: `block`, `h-auto`, and `max-w-full`.

## Pending Performance Items

### 1. `/legal` CLS Investigation

- Files: `app/legal/page.tsx`, `components/CookieConsentToggle.tsx`, `components/CookieConsentBanner.tsx`.
- `CookieConsentToggle` reads cookie state on the client and may change button text after hydration.
- Initial render can show accept text, then switch to reject text if consent exists.
- This can change button width and cause a small layout shift.
- Consider stable button width or server-derived initial consent state.
- Test `/legal` with no cookie, accepted cookie, and declined cookie.

### 2. Cookie Banner Flash

- File: `components/CookieConsentBanner.tsx`.
- The banner starts visible and checks existing preference in `useEffect`.
- If a preference exists, it disappears after hydration.
- It is fixed, so it should not push layout, but it can create visual instability.
- Consider not rendering the banner until preference is known, or deriving initial state earlier.
- Preserve `COOKIE_CONSENT_EVENT` dispatch on accept and decline.

### 3. Font Swap And Text Reflow

- File: `utils/fonts.ts`.
- Fonts use `display: 'swap'`.
- This is generally good for speed but can reflow text-heavy pages such as `/legal`.
- Review fallback metric compatibility and whether current Next/font supports useful fallback adjustment.
- Inspect `/legal` for text wrapping changes during font load.

### 4. Home Hydration Layout Decisions

- Files: `components/Header.tsx`, `components/Marta.tsx`, `app/page.tsx`.
- Some landscape/mobile layout decisions are made in `useEffect` using viewport dimensions.
- Prefer CSS media or container queries for layout where practical.
- Current Vercel data for `/` looked healthy, so avoid risky rewrites without measurement.
- Keep GSAP animations limited to transform and opacity.

### 5. Scrollbar And Width Stability

- Files: `app/page.tsx`, `app/blog/page.tsx`.
- Some layouts use `w-screen` or custom scroll containers.
- `w-screen` can create horizontal overflow when vertical scrollbars are present.
- Prefer `w-full` where viewport width is not required.
- Check desktop and mobile for horizontal overflow.

### 6. Contact Form Third-Party Widget

- File: `components/ContactForm.tsx`.
- Turnstile is wrapped in a fixed-height `h-[65px]` container, which is good.
- Keep this reserved space if refactoring.
- Verify loading and error states remain height-stable.

### 7. Analytics Data Quality

- File: `components/AnalyticsProvider.tsx`.
- Analytics and Speed Insights depend on cookie consent.
- Keep consent compliance as the priority.
- Use Lighthouse, Chrome DevTools, or WebPageTest alongside Vercel RUM.
- Wait for more production data before declaring a route fixed or regressed.

## Query And SSR Review Backlog

- Review Apollo query shapes for page routes and metadata routes; avoid duplicate fetch work where Next/Apollo caching can safely help.
- Inspect `generateMetadata` and page data fetches on blog detail routes for repeated identical queries.
- Keep route-level data fetching on the server when the first paint depends on the result.
- Pass serializable prepared data to client components instead of recalculating structural content during hydration.
- Avoid sending unused CMS fields to client components.
- Consider structured Hygraph asset queries for future image-heavy content if raw Rich Text HTML stops carrying dimensions.

## React Performance Backlog

- Keep client components narrow and interaction-focused.
- Avoid `useEffect` for content that can be known during server render.
- Watch dependency arrays in hooks that use refs, observers, or GSAP.
- Prefer stable dimensions for fixed-format UI elements to prevent hover, loading, and hydration shifts.
- Avoid DOM querying for data extraction when the same data can be generated on the server.

## Suggested Validation Workflow

- Test `/legal`, `/`, `/contact`, `/blog`, and at least one `/blog/[id]`.
- Test desktop and mobile viewports.
- Test no consent cookie, accepted cookie, and declined cookie.
- Use Chrome DevTools Performance or Lighthouse to inspect layout shifts.
- Check the initial HTML for blog posts when validating SSR improvements.
- In production, watch Vercel Speed Insights by route, metric, percentile, country, and selector.
