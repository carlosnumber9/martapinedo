'use client';

import { useGSAP } from '@gsap/react';
import type { Case, SupportedLocale } from 'app/types';
import gsap from 'gsap';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { CaseDetailContent } from './CaseDetailContent';
import { CaseItem } from './CaseItem';
import { Timeline } from './TimelineLine';

gsap.registerPlugin(useGSAP);

interface Props {
  cases: Case[];
  locale: SupportedLocale;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

const getCaseIdFromPath = () => {
  const match = window.location.pathname.match(/^\/cases\/([^/]+)$/);

  return match?.[1];
};

const shouldUseDefaultNavigation = (event: MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

export const CasesTimeline: React.FC<Props> = ({ cases, locale }) => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (selectedCase || !listRef.current) return;

      const items = listRef.current.querySelectorAll('.case-timeline-item');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.15,
        }
      );
    },
    { dependencies: [cases.length, selectedCase], scope: listRef }
  );

  useEffect(() => {
    const syncSelectedCaseWithPath = () => {
      const caseId = getCaseIdFromPath();
      setSelectedCase(cases.find((caseItem) => caseItem.id === caseId) ?? null);
    };

    window.addEventListener('popstate', syncSelectedCaseWithPath);

    return () => window.removeEventListener('popstate', syncSelectedCaseWithPath);
  }, [cases]);

  const openCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    window.history.pushState(null, '', `/cases/${caseItem.id}`);
    window.scrollTo(0, 0);
  };

  const handleSelectCase = (event: MouseEvent<HTMLAnchorElement>, caseItem: Case) => {
    if (shouldUseDefaultNavigation(event)) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition || prefersReducedMotion) {
      openCase(caseItem);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => openCase(caseItem));
    });
  };

  if (selectedCase) {
    return (
      <section className="w-full bg-darkPrimary px-6 py-28">
        <CaseDetailContent
          caseItem={selectedCase}
          cleanDescription={selectedCase.description.html}
          locale={locale}
        />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-darkPrimary pt-20">
      <Timeline />
      <ol ref={listRef} className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-28 px-6 py-28">
        {cases.map((caseItem, index) => (
          <CaseItem
            key={caseItem.id}
            caseItem={caseItem}
            index={index}
            locale={locale}
            onSelect={handleSelectCase}
          />
        ))}
      </ol>
    </section>
  );
};
