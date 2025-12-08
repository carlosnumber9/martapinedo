import React from 'react';
import { Post } from 'app/types';
import Link from 'next/link';
import { formatDate } from 'utils';

export const SinglePost: React.FC<Post> = ({
  id,
  title,
  subtitle,
  createdBy: { name },
  publishDate,
}) => (
  <div className="bg-darkSecondary/70 w-96 md:w-1/2 lg:w-1/3 transition ease-in-out duration-300 md:hover:bg-darkSecondary md:hover:scale-110 cursor-pointer text-white/80">
    <Link
      href={`/blog/${id}`}
      className="text-decoration-none flex flex-col items-center justify-between gap-2 p-5 h-full"
    >
      <h2 className='font-main text-2xl text-center'>{title}</h2>
      <p className="text-lg italic text-center font-subtitle">{subtitle}</p>
      <span className="text-gray-400 text-md">{`por ${name}`}</span>
      <span className="text-gray-400 text-md">{`Publicado ${formatDate(new Date(publishDate))}`}</span>
    </Link>
  </div>
);
