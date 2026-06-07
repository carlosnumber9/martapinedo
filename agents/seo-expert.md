# SEO Expert

Use this note for SEO work in this repository: crawlability, indexability, metadata, structured data, local SEO, multilingual search visibility, content quality, internal linking, search snippets, and search-oriented performance.

## Current Site Context

- This is a Next.js + TypeScript website for Marta Pinedo, an independent lawyer based in Madrid.
- Treat the site as a professional legal-services website where trust, accuracy, local relevance, accessibility, and privacy matter as much as rankings.
- The site appears to support Spanish and English content through `messages/es.json` and `messages/en.json`; keep metadata and visible copy aligned across both locales.
- Blog fetching and route-level rendering live under `app/blog/`; protect blog SEO when changing data fetching, slugs, article metadata, or rendering boundaries.
- Preserve the existing visual identity and user experience. SEO improvements must not degrade design, accessibility, consent behavior, legal content, or performance.

## SEO Posture

- Optimize for people-first legal usefulness first, then make that usefulness explicit to search engines.
- Prefer durable technical SEO, strong local signals, and genuinely helpful legal content over keyword stuffing or fragile tricks.
- Assume legal content is high-trust content. Be precise, cite applicable jurisdiction where relevant, and avoid broad claims that could be misleading.
- Never fabricate credentials, awards, reviews, case results, client outcomes, publication dates, office locations, or professional memberships.
- Avoid manipulative SEO tactics: hidden text, doorway pages, mass-generated thin pages, misleading schema, fake FAQ content, AI filler, or irrelevant backlink schemes.
- Make each indexable page answer a clear search intent for a Madrid-based legal audience.

## Primary Search Goals

- Help users find Marta for searches combining legal service, jurisdiction, and location, especially Madrid and Spain.
- Support brand searches for Marta Pinedo with consistent name, profession, location, and contact signals.
- Make service pages, blog posts, legal pages, and contact routes easy for Google, Bing, and other crawlers to discover and understand.
- Improve snippet quality through accurate titles, descriptions, headings, dates, images, and structured data.
- Support long-tail informational searches through blog content that is specific, current, and practically useful.

## Next.js Technical SEO

- Use the App Router Metadata API for page-level metadata instead of manually editing document head markup.
- Keep route metadata close to the route when the data is route-specific.
- Use `generateMetadata` for dynamic pages such as blog posts, using server-available CMS data.
- Define `metadataBase` at the root layout when canonical, Open Graph, or alternate URLs need absolute URLs.
- Provide stable canonical URLs for every indexable route.
- Avoid canonicalizing distinct Spanish and English pages to the same URL unless they are truly duplicates.
- Add `alternates.languages` or equivalent hreflang output for localized pages when URL structure supports it.
- Generate `app/sitemap.ts` from real routes and CMS posts rather than maintaining a stale static sitemap.
- Generate `app/robots.ts` with production-safe rules, sitemap location, and no accidental blocking of indexable pages.
- Make staging, preview, and non-production deployments explicitly `noindex` when environment data makes that possible.
- Do not ship `noindex`, `nofollow`, or robots disallow rules to production unless there is a specific reason.
- Keep critical page content server-rendered whenever possible so crawlers can see it in the initial HTML.
- Avoid depending on `useEffect` to create headings, article body, canonical links, metadata, or structured data.
- Ensure dynamic metadata uses cacheable server data when possible and does not add unnecessary rendering latency.
- Keep redirect behavior explicit and permanent only when the old URL should consolidate into the new one.

## Metadata Standards

- Every indexable page needs a unique title and meta description.
- Titles should lead with the page-specific promise, then optionally include Marta Pinedo or Abogada Madrid.
- Keep titles natural and useful; do not repeat the same keywords mechanically.
- Descriptions should summarize the page benefit, legal area, Madrid or Spain relevance, and next action when appropriate.
- Avoid duplicated descriptions across service, blog, contact, and legal pages.
- Use Open Graph and Twitter metadata for shareable pages, especially home, service pages, and blog posts.
- Use realistic preview images that represent Marta, the practice, Madrid, legal services, or the article subject.
- Keep image alt text descriptive and human, not keyword-stuffed.
- Include `publishedTime`, `modifiedTime`, authorship, and article tags for blog metadata when the CMS provides them.
- Do not invent modified dates. Use CMS `updatedAt` or a deliberate content update timestamp.

## Structured Data

- Add JSON-LD server-side in route components or layouts using `<script type="application/ld+json">`.
- Prefer schema that accurately matches the page, not schema chosen only to chase rich results.
- Use Google Search Central documentation as the source of truth for Google-supported structured data behavior.
- For the site identity, consider `LegalService`, `Attorney`, `ProfessionalService`, `LocalBusiness`, `Person`, and `Organization` where appropriate and accurate.
- For the homepage, connect Marta as a person/provider, her legal service, Madrid service area, site URL, logo or image, and contact points when publicly available.
- For contact/location pages, include address, area served, phone, email, opening hours, and geo data only when verified.
- For blog posts, use `Article` or `BlogPosting` with headline, description, author, datePublished, dateModified, image, and canonical URL.
- Use `BreadcrumbList` for nested routes such as blog detail pages when breadcrumbs are visible or the hierarchy is clear.
- Use `FAQPage` only for genuine visible FAQ sections with questions and answers present on the page.
- Do not mark every service page as FAQ just to gain search features.
- Keep JSON-LD values synchronized with visible content and translations.
- Validate structured data with Google's Rich Results Test or schema validation during manual QA when schema changes.

## Local SEO For A Madrid Lawyer

- Make Madrid relevance visible in natural places: headings, body copy, contact details, service area, and metadata.
- Use consistent NAP data: name, address, phone, and business identity must match the public Google Business Profile and legal directory listings.
- If the exact office address should not be public, do not fake one. Use service-area language consistently.
- Include clear Spanish-language local intent for core pages, because Spanish queries are likely the primary acquisition path.
- Mention relevant courts, administrative bodies, neighborhoods, or Spanish legal contexts only where they are genuinely relevant.
- Build service pages around real client intents, such as consultation, contract review, family law, employment issues, immigration, civil claims, or other actual practice areas.
- Avoid creating neighborhood doorway pages unless each page has distinct, useful, location-specific content.
- Encourage accurate external consistency across Google Business Profile, professional directories, social profiles, and legal associations, but do not manipulate reviews.
- Make contact paths crawlable and usable: visible phone/email/form, accessible labels, consent-safe analytics, and stable contact metadata.

## Legal Trust And E-E-A-T

- Surface Marta's qualifications, bar association membership, jurisdiction, years of experience, languages, services, and professional focus when verified.
- Make authorship clear on legal articles: who wrote or reviewed the piece and why they are qualified.
- Add or preserve date information for legal articles where freshness affects usefulness.
- Distinguish general legal information from legal advice when content could be misunderstood.
- Link to official legal sources, public institutions, or authoritative references where a blog post depends on specific law or procedure.
- Avoid unsupported promises such as guaranteed results, fastest solution, cheapest lawyer, or best lawyer in Madrid unless objectively substantiated.
- Keep privacy, cookie consent, legal notice, and professional disclaimers intact.
- Ensure AI-assisted content is edited for legal accuracy, jurisdiction, tone, and usefulness before publication.

## Content Strategy

- Prioritize high-intent service pages before broad blog growth.
- Each service page should clearly state who it helps, what problem it solves, Madrid/Spain applicability, process, expected documents, and how to contact Marta.
- Blog posts should answer concrete legal questions with practical steps, caveats, and jurisdictional boundaries.
- Use topic clusters: service pages as hubs, blog posts as supporting articles, and internal links connecting both directions.
- Write in plain language for clients, not only for lawyers.
- Include Spanish search phrases naturally, but keep the prose polished and professional.
- For English content, target realistic use cases such as foreign residents, international clients, or English-speaking users in Madrid.
- Avoid duplicate Spanish and English content that only changes language labels; localize examples, terminology, and search intent where useful.
- Refresh legal articles when laws, procedures, thresholds, or institutions change.
- Remove, consolidate, or noindex thin pages that do not serve a real user need.

## Information Architecture

- Keep important pages reachable through crawlable links, not only through animated interactions or client-side state.
- Use descriptive internal anchor text: "family lawyer in Madrid" is better than repeated "read more" when truthful and natural.
- Build clear paths from home to services, blog, about, contact, and legal pages.
- Keep one canonical URL per page; avoid duplicate trailing slash, query parameter, and localized URL conflicts.
- Use heading hierarchy carefully: one descriptive `h1`, then structured `h2` and `h3` sections.
- Do not use headings only for visual styling. Preserve semantic hierarchy for accessibility and search understanding.
- Keep breadcrumbs, related posts, and service cross-links useful rather than decorative.
- Ensure pagination, filters, tags, or categories do not create crawl traps or duplicate thin archive pages.

## International SEO

- Keep Spanish and English metadata equivalent in quality, not necessarily literal translations.
- Use correct `lang` attributes and localized route metadata.
- Add hreflang alternates when both languages have stable, distinct URLs.
- Include `x-default` only when there is a genuine default or language selector URL.
- Do not auto-redirect crawlers based only on geolocation or browser language.
- Make language switch links crawlable and preserve equivalent page relationships.
- Use Spanish legal terminology for Spanish pages and client-friendly English terminology for English pages.

## Performance And SEO

- Treat Core Web Vitals as SEO-adjacent and user-critical: LCP, CLS, INP, and accessible interaction quality all matter.
- Reserve space for images, embeds, cookie banners, forms, maps, and dynamic article content.
- Use Next Image or equivalent optimized image handling where it fits the existing codebase.
- Keep critical images discoverable with meaningful dimensions, alt text, and non-blocking loading choices.
- Avoid shipping heavy client JavaScript for content that could be server-rendered.
- Animate with `transform` and `opacity`; do not introduce layout shift for SEO-only additions.
- Preserve consent-first analytics behavior even if it limits SEO measurement.

## Blog SEO

- Blog URLs should be stable, readable, and based on durable slugs rather than volatile CMS IDs when practical.
- Blog index pages should expose crawlable links to posts with meaningful titles and excerpts.
- Blog detail pages should include server-rendered article body, clean heading hierarchy, author, dates, and related internal links.
- Article images should include width, height, lazy loading where appropriate, and descriptive alt text.
- Table of contents should reflect real headings and not be generated in a way that causes hydration instability.
- Use canonical URLs and avoid duplicate posts from preview, draft, ID, and slug routes.
- Add `dateModified` only when the content has materially changed.

## Measurement And QA

- Use Google Search Console for indexing, query visibility, sitemap status, coverage, enhancements, and manual actions.
- Use Bing Webmaster Tools where practical; do not optimize only for Google-specific behavior.
- Use Lighthouse SEO checks as a basic automated guard, not as a complete SEO audit.
- Manually inspect rendered HTML for key routes after SEO changes.
- Verify that title, description, canonical, robots, hreflang, Open Graph, JSON-LD, and main content are present in the initial HTML.
- Test `/`, `/contact`, `/blog`, at least one `/blog/[id]` or slug route, legal pages, and any service pages touched.
- Test mobile and desktop viewports for layout and snippet-relevant visible content.
- Run `npm run lint` after code changes.
- Run `npm run build` when metadata, routing, sitemap, robots, structured data, or data fetching changes.
- If `npm run build` fails because `next/font` cannot fetch Google Fonts in a restricted environment, report it clearly.

## SEO Change Checklist

- Is the target search intent clear and aligned with a real user need?
- Is the page indexable only if it deserves to be indexed?
- Does the initial HTML contain the main content and SEO-critical metadata?
- Is the title unique, natural, and useful?
- Is the description unique and likely to produce a good search snippet?
- Is the canonical URL correct?
- Are localized alternates correct, if applicable?
- Is schema accurate, visible-content-aligned, and validated?
- Are images optimized, dimensioned, and accessible?
- Are internal links helping users and crawlers understand the site's structure?
- Did the change preserve legal accuracy, trust, privacy, consent, accessibility, and visual quality?

## External References

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, Structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central, Page experience: https://developers.google.com/search/docs/appearance/page-experience
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js sitemap file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
