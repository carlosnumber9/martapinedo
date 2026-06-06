import type { MouseEvent } from 'react';
import type { Case, SupportedLocale } from 'app/types';
import type { CSSProperties } from 'react';
import { getLocalizedDate } from 'utils';

interface Props {
  caseItem: Case;
  index: number;
  locale: SupportedLocale;
  onSelect?: (event: MouseEvent<HTMLAnchorElement>, caseItem: Case) => void;
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
    <li className="flex w-full justify-center">
      <a
        href={`/cases/${caseItem.id}`}
        className={`relative z-10 block w-[calc(100%-3rem)] max-w-xs border-2 border-blueSecondary/25 bg-darkSecondary/95 p-6 shadow-contact transition-colors duration-300 hover:border-blueSecondary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueSecondary ${offsetClass}`}
        onClick={(event) => onSelect?.(event, caseItem)}
        style={{ viewTransitionName: `case-${caseItem.id}` } as ViewTransitionStyle}
      >
        <time className="font-body text-sm text-blueSecondary" dateTime={caseItem.solvedAt}>
          {getLocalizedDate(caseItem.solvedAt, locale)}
        </time>
        <h2 className="mt-4 font-subtitle text-2xl text-white">{caseItem.heading}</h2>
        <p className="mt-3 font-body text-base text-white/80">{caseItem.caseName}</p>
      </a>
    </li>
  );
};
