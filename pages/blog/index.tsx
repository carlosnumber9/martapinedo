import Link from "next/link";
import { useEffect } from "react";
import fetchPosts from "./utils";

const Blog: any = () => {
  
  useEffect(() => {
    fetchPosts();
  });

  return (
    <div>
      <div> This is the blog section </div>

      <Link href="/" rel="noopener noreferrer">
        <h2>Back to home &rarr;</h2>
      </Link>
    </div>
  );
};

export default Blog;
