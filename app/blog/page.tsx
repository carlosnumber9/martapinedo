import { apolloClient } from 'utils';
import { Post } from '../types';
import { SinglePost } from './Post';
import { GET_POSTS as query } from './queries';

export async function generateMetadata() {
  return {
    title: `El Blog - Marta Pinedo Sánchez`,
  };
}

async function Blog() {
  const { data } = await apolloClient.query({ query });

  return (
    <div className="p-8 w-screen flex flex-wrap justify-center h-auto">
      {data.posts?.map((post: Post) => <SinglePost key={post.id} {...post} />)}
    </div>
  );
}

export default Blog;
