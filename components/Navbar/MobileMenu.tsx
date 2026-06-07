import LanguageSwitcher from 'components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { NavbarButton } from './NavbarButton';

interface Props {
  onClickLink: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export const MobileMenu: React.FC<Props> = ({ onClickLink, ref }) => {
  const t = useTranslations('navbar');
  return (
    <div
      ref={ref}
      className="mobile-menu sm:hidden fixed top-0 left-0 flex h-full w-full flex-col items-center justify-start gap-5 overflow-y-hidden bg-darkSecondary pt-20 pb-10 shadow-lg z-40"
    >
      <hr className="mt-12 border-white/20" />
      <NavbarButton text={t('buttons.cases')} route="/cases" isMobile onClick={onClickLink} />
      <hr className="w-3/4 border-white/20" />
      <NavbarButton text={t('buttons.contact')} route="/contact" isMobile onClick={onClickLink} />
      <hr className="w-3/4 border-white/20" />
      <NavbarButton text={t('buttons.blog')} route="/blog" isMobile onClick={onClickLink} />
      <hr className="w-3/4 border-white/20" />
      <NavbarButton
        text={t('buttons.legal')}
        route="/legal"
        isMobile
        align="end"
        onClick={onClickLink}
      />
      <div className="w-full h-15 flex items-center justify-center text-4xl p-5">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
