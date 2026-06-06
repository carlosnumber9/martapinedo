import type { Case, SupportedLocale } from 'app/types';
import { Heading } from 'components/Heading';
import type { CSSProperties } from 'react';
import { getLocalizedDate } from 'utils';
import { CaseBackButton } from './CaseBackButton';

interface Props {
  backLabel: string;
  caseItem: Case;
  cleanDescription: string;
  locale: SupportedLocale;
  onBack?: () => void;
}

type ViewTransitionStyle = CSSProperties & {
  viewTransitionName: string;
};

export const CaseDetailContent: React.FC<Props> = ({
  backLabel,
  caseItem,
  cleanDescription,
  locale,
  onBack,
}) => (
  <article
    className="relative mx-auto min-h-[calc(100vh-10rem)] w-full max-w-5xl border-2 border-blueSecondary/25 bg-darkSecondary/95 px-6 py-10 shadow-contact sm:px-10 lg:px-14"
    style={{ viewTransitionName: `case-${caseItem.id}` } as ViewTransitionStyle}
  >
    <CaseBackButton label={backLabel} onBack={onBack} />
    <header className="border-b border-blueSecondary/25 pb-8 pt-12">
      <time className="font-body text-sm text-blueSecondary" dateTime={caseItem.solvedAt}>
        {getLocalizedDate(caseItem.solvedAt, locale)}
      </time>
      <Heading variant="caseDetailTitle">{caseItem.heading}</Heading>
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
