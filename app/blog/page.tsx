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

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center mb-6">Blog</h1>
      <div className="space-y-4">
        {posts?.map((post: Post) => <SinglePost key={post.id} {...post} />)}
      </div>
    </div>
  );
}

export default Blog;
