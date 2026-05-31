import { useEffect, useState } from 'react';

export const useTableOfContents = (postRef: React.RefObject<HTMLDivElement | null>) => {
  const [currentHeadingID, setCurrentHeadingID] = useState<string | undefined>(undefined);

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
  }, [postRef.current]);

  return { currentHeadingID };
};
