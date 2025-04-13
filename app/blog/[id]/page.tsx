import { notFound } from 'next/navigation';
import { apolloClient } from 'utils';
import { GET_POST as query } from './queries';
import DOMPurify from 'isomorphic-dompurify';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
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

    const { title, subtitle, body } = data.posts[0];
    const sanitizedBody = DOMPurify.sanitize(body.html);

    return (
      <div className="p-8 w-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 mb-8">{subtitle}</p>
        <article
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
        />
      </div>
    );
  } catch (err: unknown) {
    console.error('Error:', err);
    notFound();
  }
};

export default PostPage;
