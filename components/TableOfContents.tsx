'use client';

import classNames from 'classnames';
import { useTableOfContents } from 'hooks/useTableOfContents';
import React from 'react';

interface Props {
  postRef: React.RefObject<HTMLDivElement | null>;
}

export const TableOfContents: React.FC<Props> = ({ postRef }) => {
  const { headings, currentHeadingID } = useTableOfContents(postRef);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <nav className="post-index hidden xl:block fixed top-1/2 -translate-y-1/2 right-4 h-fit ml-8 w-64">
      <ul className="flex flex-col gap-4 pl-6 font-subtitle text-sm">
        {headings.map(({ title, level, id }, index) => (
          <li key={index} className="relative group">
            <a
              href={`#${id}`}
              className={classNames(
                'block hover:text-white hover:scale-110 transition-all duration-200 ease-in-out',
                {
                  'text-white scale-110': currentHeadingID === id,
                  'text-gray-400': currentHeadingID !== id,
                  'mr-10': level === 3,
                  'mr-5': level === 2,
                }
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
