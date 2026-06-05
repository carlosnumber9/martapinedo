import type { Case, SupportedLocale } from 'app/types';
import { getLocalizedDate } from 'utils';

interface Props {
  caseItem: Case;
  index: number;
  locale: SupportedLocale;
}

export const CaseItem: React.FC<Props> = ({ caseItem, index, locale }) => {
  const isRightAligned = index % 2 === 0;
  const offsetClass = isRightAligned
    ? 'translate-x-6 sm:translate-x-24 lg:translate-x-32'
    : '-translate-x-6 sm:-translate-x-24 lg:-translate-x-32';

  return (
    <li className="flex w-full justify-center">
      <article
        className={`relative z-10 w-[calc(100%-3rem)] max-w-xs border-2 border-blueSecondary/25 bg-darkSecondary/95 p-6 shadow-contact ${offsetClass}`}
      >
        <time className="font-body text-sm text-blueSecondary" dateTime={caseItem.solvedAt}>
          {getLocalizedDate(caseItem.solvedAt, locale)}
        </time>
        <h2 className="mt-4 font-subtitle text-2xl text-white">{caseItem.heading}</h2>
        <p className="mt-3 font-body text-base text-white/80">{caseItem.caseName}</p>
      </article>
    </li>
  );
};
