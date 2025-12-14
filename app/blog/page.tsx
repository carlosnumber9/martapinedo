import { apolloClient } from 'utils';
import { Post, SupportedLocale } from '../types';
import { SinglePost } from './Post';
import { GET_POSTS as query } from './queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale() as SupportedLocale;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: {
      absolute: t('title'),
    },
    description: t('description'),
  };
}

async function Blog() {
  try {
    const locale = await getLocale() as SupportedLocale;
    const { data } = await apolloClient.query({ query, variables: { locale } });
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
