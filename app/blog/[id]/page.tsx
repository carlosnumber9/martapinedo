import { SupportedLocale } from 'app/types';
import { PostContent } from 'components';
import { JsonLd } from 'components/StructuredData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { extractHeadingsFromHTML, getCleanPostBody } from 'utils';
import { buildPageMetadata, SITE_URL } from 'utils/seo';
import { getBlogPostById, getBlogPostMetadata } from '../_data/posts';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const locale: SupportedLocale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('blog');
  const { id } = await params;

  try {
    const post = await getBlogPostMetadata(id, locale);

    if (!post) {
      notFound();
    }

    return buildPageMetadata({
      title: `${post.title} | Marta Pinedo Sánchez`,
      description: post.subtitle || t('description'),
      path: `/blog/${id}`,
      image: '/blog.png',
      type: 'article',
      publishedTime: post.publishDate || post.publishedAt,
      modifiedTime: post.lastModificationDate || post.updatedAt,
      authors: post.createdBy?.name ? [post.createdBy.name] : undefined,
    });
  } catch (err) {
    console.error('Error fetching metadata:', err);
    notFound();
  }
}

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const locale = (await getLocale()) as SupportedLocale;

  try {
    const post = await getBlogPostById(id, locale);

    if (!post) {
      notFound();
    }

    const cleanHTML = getCleanPostBody(post.body.html);
    const headings = extractHeadingsFromHTML(cleanHTML);
    const postUrl = `${SITE_URL}/blog/${post.id}`;
    const articleStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${postUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      headline: post.title,
      description: post.subtitle || post.body.text,
      image: `${SITE_URL}/blog.png`,
      datePublished: post.publishDate || post.publishedAt,
      dateModified: post.lastModificationDate || post.updatedAt || post.publishDate,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: post.createdBy.name,
        image: post.createdBy.picture,
      },
      publisher: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Marta Pinedo Sánchez',
        image: `${SITE_URL}/marta.png`,
      },
    };

    return (
      <>
        <JsonLd data={articleStructuredData} />
        <PostContent post={post} cleanHTML={cleanHTML} headings={headings} />
      </>
    );
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
