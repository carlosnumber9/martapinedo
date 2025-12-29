'use client';

import { IndexHeading } from 'app/types';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { extractHeadings, getHeadingID } from 'utils';

interface Props {
  postRef: React.RefObject<HTMLDivElement | null>;
}

export const PostIndex: React.FC<Props> = ({ postRef }) => {
  const [currentHeadingID, setCurrentHeadingID] = useState<string | undefined>(undefined);
  const [headings, setHeadings] = useState<IndexHeading[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: I disagree with the suggestion here
  useEffect(() => {
    const extractedHeadings: IndexHeading[] = extractHeadings(postRef);
    setHeadings(extractedHeadings);
  }, [postRef.current?.innerHTML]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: I disagree with the suggestion here
  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentHeadingID(entry.target.id);
        }
      });
    });

    const headingElements = postRef.current?.querySelectorAll('h2, h3');
    headingElements?.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [headings]);

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
