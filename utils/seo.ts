import type { Metadata } from 'next';

export const SITE_URL = 'https://www.martapinedoabogada.es';
export const SITE_NAME = 'Marta Pinedo Sánchez | Abogada';
export const DEFAULT_OG_IMAGE = '/marta.png';

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

const normalizePath = (path: string = '/') => (path.startsWith('/') ? path : `/${path}`);

export const buildPageMetadata = ({
  authors,
  description,
  image = DEFAULT_OG_IMAGE,
  modifiedTime,
  path = '/',
  publishedTime,
  title,
  type = 'website',
}: PageMetadataOptions): Metadata => {
  const canonicalPath = normalizePath(path);
  const openGraphBase = {
    title,
    description,
    url: canonicalPath,
    siteName: SITE_NAME,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph:
      type === 'article'
        ? {
            ...openGraphBase,
            type: 'article',
            publishedTime,
            modifiedTime,
            authors,
          }
        : {
            ...openGraphBase,
            type: 'website',
          },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};
