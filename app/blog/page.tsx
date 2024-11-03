import { Post } from '../types';
import fetchPosts from './utils/dataFetching';

export async function generateMetadata() {
  return {
    title: `The Blog - Marta Pinedo Sánchez`,
  };
}

async function Blog() {
  const posts = await fetchPosts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
      <div className="space-y-4">
        {posts?.map((post: Post) => (
          <p
            key={post.id}
            className="text-lg text-gray-800 bg-white p-4 rounded shadow"
          >
            {post.id}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Blog;
