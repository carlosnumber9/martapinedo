import { Post } from '../types';
import fetchPosts from './utils/dataFetching';

export async function generateMetadata() {
  return {
    title: `The Blog - Marta Pinedo Sánchez`,
  };
}

async function Blog() {
  const posts = await fetchPosts();

  return <>{posts?.map((post: Post) => <p key={post.id}>{post.id}</p>)}</>;
}

export default Blog;
