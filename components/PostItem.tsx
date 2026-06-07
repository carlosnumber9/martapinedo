'use client';

import { Post } from 'app/types';
import { useFormatDate } from 'hooks';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Heading } from './Heading';
import { TransitionLink } from './TransitionLink';

export const PostItem: React.FC<Post> = ({
  id,
  title,
  subtitle,
  createdBy: { name },
  publishDate,
}) => {
  const t = useTranslations('blog');
  const formatDate = useFormatDate();
  return (
    <div className="bg-darkSecondary/70 md:w-1/2 lg:w-1/3 transition ease-in-out duration-300 md:hover:bg-darkSecondary md:hover:scale-110 cursor-pointer text-white/80">
      <TransitionLink
        href={`/blog/${id}`}
        className="text-decoration-none flex flex-col items-center justify-between gap-2 p-5 h-full"
      >
        <Heading variant="postCardTitle">{title}</Heading>
        <p className="text-lg italic text-center font-subtitle">{subtitle}</p>
        <span className="text-gray-400 text-md">{`${t('byLabel')} ${name}`}</span>
        <span className="text-gray-400 text-sm">{`${t('publishedLabel')} ${formatDate(new Date(publishDate))}`}</span>
      </TransitionLink>
    </div>
  );
};
