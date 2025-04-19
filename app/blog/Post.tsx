import React from 'react';
import { Post } from 'app/types';
import Link from 'next/link';
import { formatDate } from 'utils';

export const SinglePost: React.FC<Post> = ({
  id,
  title,
  subtitle,
  publishDate,
}) => (
  <div className="bg-darkSecondary m-1 w-96 md:w-1/2 lg:w-1/4 h-64 transition ease-in-out duration-300 hover:bg-darkSecondary/70 hover:scale-110 cursor-pointer">
    <Link
      href={`/blog/${id}`}
      className="text-decoration-none flex flex-col items-center justify-center gap-2 p-5 h-full"
    >
      <h2>{title}</h2>
      <p className="text-sm italic text-gray-300 text-center">{subtitle}</p>
      <span className="text-gray-400 text-xs">{`Publicado ${formatDate(new Date(publishDate))}`}</span>
    </Link>
  </div>
);
