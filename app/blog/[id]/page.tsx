import { notFound } from 'next/navigation';
import { apolloClient } from 'utils';
import { GET_POST as query } from './queries';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await apolloClient.query({
      query,
      variables: { id },
    });

    if (!data.posts || data.posts.length === 0) {
      notFound();
    }

    const { title } = data.posts[0];

    return {
      title: `${title} | Marta Pinedo Sánchez`,
      description: 'Blog de Marta Pinedo Sánchez',
    };
  } catch (err) {
    console.error('Error fetching metadata:', err);
    notFound();
  }
}

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const { data, error } = await apolloClient.query({
      query,
      variables: { id },
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
    const sanitizedBody = DOMPurify.sanitize(body.html);

    return (
      <div className="p-8 mt-5 flex flex-col items-center w-11/12 sm:w-3/4 bg-darkSecondary text-gray-200">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex justify-between items-center w-full mb- flex-wrap">
          <div className="flex items-center justify-center">
            <Image
              src={picture}
              alt={name}
              className="w-10 h-10 rounded-full mr-2"
              width={30}
              height={30}
            />
            <span className="text-sm mb-2 text-gray-400">{name}</span>
          </div>

          <span className="text-sm mb-2 text-gray-400">
            {new Date(publishDate).toLocaleDateString()}
          </span>
        </div>

        <p className="italic mt-8 text-center">{subtitle}</p>
        <article
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
          className="prose prose-invert prose-h3:mt-5 prose-headings:text-xl mt-5"
        />
      </div>
    );
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
