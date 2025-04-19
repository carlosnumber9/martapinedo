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
  <div className="flex flex-col items-center justify-center bg-darkSecondary m-1 w-96 md:w-1/2 lg:w-1/4 p-5 gap-2 h-64">
    <h2>{title}</h2>
    <p className="text-sm italic text-gray-300 text-center">{subtitle}</p>
    <span className="text-gray-400 text-xs">{`Publicado ${formatDate(new Date(publishDate))}`}</span>
    <Link
      href={`/blog/${id}`}
      className="text-blueSecondary hover:text-blue-400"
    >
      Leer más
    </Link>
  </div>
);
