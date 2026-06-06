'use client';

import type { Case, SupportedLocale } from 'app/types';
import { Heading } from 'components/Heading';
import type { CSSProperties } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { getLocalizedDate } from 'utils';

interface Props {
  caseItem: Case;
  index: number;
  locale: SupportedLocale;
  onSelect?: (event: ReactMouseEvent<HTMLAnchorElement>, caseItem: Case) => void;
}

type ViewTransitionStyle = CSSProperties & {
  viewTransitionName: string;
};

export const CaseItem: React.FC<Props> = ({ caseItem, index, locale, onSelect }) => {
  const isRightAligned = index % 2 === 0;
  const offsetClass = isRightAligned
    ? 'translate-x-6 sm:translate-x-24 lg:translate-x-32'
    : '-translate-x-6 sm:-translate-x-24 lg:-translate-x-32';

  return (
    <li className="case-timeline-item flex w-full justify-center">
      <div className={`w-[calc(100%-3rem)] max-w-xs ${offsetClass}`}>
        <a
          href={`/cases/${caseItem.id}`}
          className="case-timeline-card relative z-10 block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueSecondary"
          onClick={(event) => onSelect?.(event, caseItem)}
          style={{ viewTransitionName: `case-${caseItem.id}` } as ViewTransitionStyle}
        >
          <div className="case-timeline-card-scale relative origin-center border-2 border-blueSecondary/25 bg-darkSecondary/95 p-6 shadow-contact transition-colors duration-700 ease-out hover:border-blueSecondary/70">
            <time className="font-body text-sm text-blueSecondary" dateTime={caseItem.solvedAt}>
              {getLocalizedDate(caseItem.solvedAt, locale)}
            </time>
            <Heading variant="caseCardTitle">{caseItem.heading}</Heading>
            <p className="mt-3 font-body text-base text-white/80">{caseItem.caseName}</p>
          </div>
        </a>
      </div>
    </li>
  );
};
