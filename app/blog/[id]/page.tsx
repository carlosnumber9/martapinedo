import { SupportedLocale } from 'app/types';
import { PostContent } from 'components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { apolloClient, getCleanPostBody } from 'utils';
import { GET_POST as query } from './queries';

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
    const { data } = await apolloClient.query({
      query,
      variables: { id, locale },
    });

    if (!data.posts || data.posts.length === 0) {
      notFound();
    }

    const { title } = data.posts[0];

    return {
      title: `${title} | Marta Pinedo Sánchez`,
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
    const { data, error } = await apolloClient.query({
      query,
      variables: { id, locale },
    });

    if (error) {
      console.error('Error fetching post:', error);
      notFound();
    }

    if (!data.posts || data.posts.length === 0) {
      notFound();
    }

    return <PostContent post={data.posts[0]} />;
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
