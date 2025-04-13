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
  <div className="flex flex-col items-center justify-center bg-darkSecondary m-1 w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5">
    <h2>{title}</h2>
    <h3>{subtitle}</h3>
    <span className="text-gray-400">{`Publicado ${formatDate(new Date(publishDate))}`}</span>
    <Link
      href={`/blog/${id}`}
      className="text-blueSecondary hover:text-blue-400"
    >
      Leer más
    </Link>
  </div>
);
