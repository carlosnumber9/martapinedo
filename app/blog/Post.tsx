import React from 'react';
import { Post } from 'app/types';
import Link from 'next/link';

const formatDate = (publishDate: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - publishDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    if (diffInHours === 1) {
      return 'hace 1 hora';
    }
    return `hace ${diffInHours} horas`;
  }

  if (diffInHours >= 24 && diffInHours < 48) {
    return 'ayer';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    ...(publishDate.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
  };

  return `el ${new Intl.DateTimeFormat('es-ES', options).format(publishDate)}`;
};

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
      href={`/blog/${id}-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="text-blueSecondary hover:text-blue-400"
    >
      Leer más
    </Link>
  </div>
);
