import Link from "next/link";
import Head from "next/head";
import { Post } from "../types";
import fetchPosts from "./utils/dataFetching";

async function Blog() {
  const posts = await fetchPosts();

  return (
    <>
      <Head>
        <title> The Blog | Marta Pinedo Sánchez </title>
      </Head>

      {posts?.map((post: Post) => (
        <p key={post.id}>{post.id}</p>
      ))}

      <Link href="/" rel="noopener noreferrer">
        <h2>Back to home &rarr;</h2>
      </Link>
    </>
  );
}

export default Blog;
