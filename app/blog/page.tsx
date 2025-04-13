import { apolloClient } from 'utils';
import { Post } from '../types';
import { SinglePost } from './Post';
import { GET_POSTS as query } from './queries';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: `El Blog - Marta Pinedo Sánchez`,
  };
}

async function Blog() {
  try {
    const { data } = await apolloClient.query({ query });

    return (
      <div className="p-8 w-screen flex flex-wrap justify-center h-auto">
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
