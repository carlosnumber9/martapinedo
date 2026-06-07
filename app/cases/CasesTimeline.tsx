'use client';

import type { Case, SupportedLocale } from 'app/types';
import { Button, Heading } from 'components';
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { prefersReducedMotion } from 'utils/animations';
import { CaseDetailArea } from './CaseDetailArea';
import { CaseDetailContent } from './CaseDetailContent';
import { CaseItem } from './CaseItem';
import { Timeline } from './TimelineLine';
import { useCaseSelectionRoute } from './useCaseSelectionRoute';
import { useTimelineCards } from './useTimelineCards';

interface Props {
  backLabel: string;
  cases: Case[];
  cta: string;
  locale: SupportedLocale;
  title: string;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

const shouldUseDefaultNavigation = (event: MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

export const CasesTimeline: React.FC<Props> = ({ backLabel, cases, cta, locale, title }) => {
  const { closeCase, openCase, selectedCase } = useCaseSelectionRoute(cases);
  const { listRef, resetCardProximity, updateCardProximity } = useTimelineCards({
    isDisabled: Boolean(selectedCase),
  });

  const handleSelectCase = (event: MouseEvent<HTMLAnchorElement>, caseItem: Case) => {
    if (shouldUseDefaultNavigation(event)) return;

    event.preventDefault();

    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition || prefersReducedMotion()) {
      openCase(caseItem);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => openCase(caseItem));
    });
  };

  if (selectedCase) {
    return (
      <CaseDetailArea onBack={closeCase}>
        <CaseDetailContent
          backLabel={backLabel}
          caseItem={selectedCase}
          cleanDescription={selectedCase.description.html}
          locale={locale}
          onBack={closeCase}
        />
      </CaseDetailArea>
    );
  }

  return (
    <section
      className="relative min-h-screen w-full overflow-x-hidden bg-darkPrimary pt-20"
      onMouseLeave={resetCardProximity}
      onMouseMove={updateCardProximity}
    >
      <Timeline />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-36 pt-24 text-center sm:pb-44">
        <Heading variant="caseTimelineTitle">{title}</Heading>
      </div>
      <ol
        ref={listRef}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-28 px-6 pb-28"
      >
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
      <div className="relative z-10 flex w-full justify-center px-6 pb-28">
        <Button href="/contact" variant="secondary" size="lg" className="font-subtitle">
          {cta}
        </Button>
      </div>
    </section>
  );
};
