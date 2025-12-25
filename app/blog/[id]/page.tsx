import { SupportedLocale } from 'app/types';
import { BackToTopButton } from 'components';
import { Metadata } from 'next';
import Image from 'next/image';
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

    const {
      title,
      subtitle,
      body,
      publishDate,
      createdBy: { name, picture },
    } = data.posts[0];

    const cleanHTML = getCleanPostBody(body.html);

    return (
      <div className="min-h-screen bg-darkSecondary py-12 px-14 md:my-6">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white leading-tight font-main">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl italic text-gray-100 mt-8 leading-relaxed mb-6 font-subtitle">
                {subtitle}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <Image
                  src={picture}
                  alt={name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <span className="text-sm text-gray-300 font-subtitle">{name}</span>
              </div>

              <time className="text-sm text-gray-400 font-subtitle" dateTime={publishDate}>
                {new Date(publishDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <div
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
            className="prose prose-lg prose-invert max-w-none
                       prose-headings:text-white prose-headings:font-bold prose-headings:font-main
                       prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
                       prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                       prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                       prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-body
                       prose-strong:text-white/50 prose-strong:font-semibold
                       prose-em:text-gray-300
                       prose-a:text-blueSecondary prose-a:no-underline hover:prose-a:underline
                       prose-ul:my-6 prose-ol:my-6
                       prose-li:text-gray-200 prose-li:my-2 
                       prose-img:mx-auto"
          />
        </article>
        <BackToTopButton />
      </div>
    );
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
