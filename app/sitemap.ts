import type { MetadataRoute } from 'next';
import { SITE_URL } from 'utils/seo';
import { getSitemapPosts } from './blog/_data/posts';
import { getSitemapCases } from './cases/_data/cases';

export const dynamic = 'force-dynamic';

type SitemapEntry = MetadataRoute.Sitemap[number];

const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

const staticRoutes: SitemapEntry[] = [
  {
    url: SITE_URL,
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/blog'),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: absoluteUrl('/cases'),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: absoluteUrl('/contact'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: absoluteUrl('/legal'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

const parseDate = (value?: string | null) => (value ? new Date(value) : undefined);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, casesResult] = await Promise.allSettled([
    getSitemapPosts('es'),
    getSitemapCases('es'),
  ]);

  if (postsResult.status === 'rejected') {
    console.error('Error generating blog sitemap entries:', postsResult.reason);
  }

  if (casesResult.status === 'rejected') {
    console.error('Error generating case sitemap entries:', casesResult.reason);
  }

  const blogPosts: SitemapEntry[] =
    postsResult.status === 'fulfilled'
      ? postsResult.value.map((post) => ({
          url: absoluteUrl(`/blog/${post.id}`),
          lastModified: parseDate(post.lastModificationDate),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      : [];

  const cases: SitemapEntry[] =
    casesResult.status === 'fulfilled'
      ? casesResult.value.map((caseItem) => ({
          url: absoluteUrl(`/cases/${caseItem.id}`),
          lastModified: parseDate(caseItem.solvedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      : [];

  return [...staticRoutes, ...blogPosts, ...cases];
}
