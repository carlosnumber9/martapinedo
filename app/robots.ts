import type { MetadataRoute } from 'next';
import { SITE_URL } from 'utils/seo';

const isProduction = () => {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === 'production';
  }

  return process.env.NODE_ENV === 'production';
};

export default function robots(): MetadataRoute.Robots {
  const production = isProduction();

  return {
    rules: {
      userAgent: '*',
      allow: production ? '/' : undefined,
      disallow: production ? undefined : '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
