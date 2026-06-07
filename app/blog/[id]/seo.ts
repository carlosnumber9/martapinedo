import type { Post, SupportedLocale } from 'app/types';
import {
  buildBlogPostingStructuredData,
  buildBreadcrumbStructuredData,
  getLocalizedHomeLabel,
  SITE_URL,
} from 'utils/seo';

export const buildBlogPostStructuredData = (post: Post, locale: SupportedLocale) =>
  buildBlogPostingStructuredData({
    authorImage: post.createdBy.picture,
    authorName: post.createdBy.name,
    dateModified: post.lastModificationDate || post.updatedAt || post.publishDate,
    datePublished: post.publishDate || post.publishedAt,
    description: post.subtitle || post.body.text,
    headline: post.title,
    inLanguage: locale,
    url: `${SITE_URL}/blog/${post.id}`,
  });

export const buildBlogPostBreadcrumbStructuredData = (
  post: Post,
  locale: SupportedLocale
) =>
  buildBreadcrumbStructuredData([
    {
      name: getLocalizedHomeLabel(locale),
      url: SITE_URL,
    },
    {
      name: 'Blog',
      url: `${SITE_URL}/blog`,
    },
    {
      name: post.title,
      url: `${SITE_URL}/blog/${post.id}`,
    },
  ]);
