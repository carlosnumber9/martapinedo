import { apolloClient } from 'utils';
import { Post, SupportedLocale } from '../types';
import { SinglePost } from './Post';
import { GET_POSTS as query } from './queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  const locale: SupportedLocale = params?.locale ?? 'es';
  const t = await getTranslations('blog');

  return {
    title: {
      absolute: t('title'),
    },
    description: t('description'),
  };
}

async function Blog() {
  try {
    const { data } = await apolloClient.query({ query });
    return (
      <div className="p-8 w-screen flex flex-row flex-wrap gap-7 h-auto justify-center items-stretch xl:justify-start">
        {data.posts?.map((post: Post) => (
          <SinglePost key={post.id} {...post} />
        ))}
      </div>
    );
  } catch (_err: unknown) {
    console.error('Error fetching posts:', _err);
    notFound();
  }
}

export default Blog;
