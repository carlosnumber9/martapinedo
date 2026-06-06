import { SupportedLocale } from 'app/types';
import { PostContent } from 'components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { extractHeadingsFromHTML, getCleanPostBody } from 'utils';
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

    return {
      title: `${post.title} | Marta Pinedo Sánchez`,
      description: t('description'),
    };
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

    return <PostContent post={post} cleanHTML={cleanHTML} headings={headings} />;
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
