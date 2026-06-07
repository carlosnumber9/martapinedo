import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingVariant =
  | 'homeHeadline'
  | 'sectionTitle'
  | 'contactTitle'
  | 'notFoundTitle'
  | 'postTitle'
  | 'postCardTitle'
  | 'serviceCardTitle'
  | 'legalTitle'
  | 'legalSectionTitle'
  | 'caseTimelineTitle'
  | 'caseCardTitle'
  | 'caseDetailTitle';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  children: ReactNode;
  variant: HeadingVariant;
}

const headingVariants: Record<HeadingVariant, { className: string; tag: HeadingTag }> = {
  homeHeadline: {
    tag: 'h1',
    className: 'text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-white/90 font-main text-center max-w-full',
  },
  sectionTitle: {
    tag: 'h2',
    className: 'font-main text-4xl uppercase text-white/95 sm:text-5xl',
  },
  contactTitle: {
    tag: 'h1',
    className: 'mb-10 text-center font-main text-4xl uppercase text-white/95 sm:text-5xl',
  },
  notFoundTitle: {
    tag: 'h1',
    className: 'mb-6 font-main text-4xl text-white/90 sm:text-6xl',
  },
  postTitle: {
    tag: 'h1',
    className: 'text-2xl md:text-4xl font-bold mb-2 text-white leading-tight font-main',
  },
  postCardTitle: {
    tag: 'h2',
    className: 'font-main text-2xl text-center',
  },
  serviceCardTitle: {
    tag: 'h3',
    className: 'font-subtitle text-lg text-white/95 sm:text-xl',
  },
  legalTitle: {
    tag: 'h1',
    className: 'text-3xl font-bold mb-4',
  },
  legalSectionTitle: {
    tag: 'h2',
    className: 'text-2xl mb-2 font-subtitle',
  },
  caseTimelineTitle: {
    tag: 'h1',
    className: 'max-w-3xl font-main text-4xl uppercase text-white/95 drop-shadow-[0_2px_18px_rgba(28,15,19,0.95)] sm:text-5xl',
  },
  caseCardTitle: {
    tag: 'h2',
    className: 'mt-4 font-subtitle text-2xl text-white',
  },
  caseDetailTitle: {
    tag: 'h1',
    className: 'mt-5 font-main text-3xl text-white sm:text-5xl',
  },
};

export const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  className,
  variant,
  ...props
}) => {
  const { className: variantClassName, tag } = headingVariants[variant];
  const Component = as ?? tag;

  return (
    <Component className={classNames(variantClassName, className)} {...props}>
      {children}
    </Component>
  );
};
