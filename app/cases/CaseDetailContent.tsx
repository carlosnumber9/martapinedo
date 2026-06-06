import type { Case, SupportedLocale } from 'app/types';
import type { CSSProperties } from 'react';
import { getLocalizedDate } from 'utils';

interface Props {
  caseItem: Case;
  cleanDescription: string;
  locale: SupportedLocale;
}

type ViewTransitionStyle = CSSProperties & {
  viewTransitionName: string;
};

export const CaseDetailContent: React.FC<Props> = ({ caseItem, cleanDescription, locale }) => (
  <article
    className="mx-auto min-h-[calc(100vh-10rem)] w-full max-w-5xl border-2 border-blueSecondary/25 bg-darkSecondary/95 px-6 py-10 shadow-contact sm:px-10 lg:px-14"
    style={{ viewTransitionName: `case-${caseItem.id}` } as ViewTransitionStyle}
  >
    <header className="border-b border-blueSecondary/25 pb-8">
      <time className="font-body text-sm text-blueSecondary" dateTime={caseItem.solvedAt}>
        {getLocalizedDate(caseItem.solvedAt, locale)}
      </time>
      <h1 className="mt-5 font-main text-3xl text-white sm:text-5xl">{caseItem.heading}</h1>
      <p className="mt-5 max-w-3xl font-subtitle text-xl text-white/85 sm:text-2xl">
        {caseItem.caseName}
      </p>
    </header>
    <div
      className="prose prose-lg prose-invert mt-10 max-w-none
                 prose-p:font-body prose-p:leading-relaxed prose-p:text-gray-200"
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  </article>
);
