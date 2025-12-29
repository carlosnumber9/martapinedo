import { IndexHeading } from 'app/types';
import { useEffect, useState } from 'react';
import { extractHeadings } from 'utils';

export const useTableOfContents = (postRef: React.RefObject<HTMLDivElement | null>) => {
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

  return { headings, currentHeadingID };
};
