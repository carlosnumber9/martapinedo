import { Post } from '../types';
import { SinglePost } from './Post';
import fetchPosts from './utils/dataFetching';

export async function generateMetadata() {
  return {
    title: `El Blog - Marta Pinedo Sánchez`,
  };
}

async function Blog() {
  const posts = await fetchPosts();

  console.debug('posts', posts);

  return (
    <div className="p-8 w-screen flex flex-wrap justify-center h-auto">
      {posts?.map((post: Post) => <SinglePost key={post.id} {...post} />)}
    </div>
  );
}

export default Blog;
