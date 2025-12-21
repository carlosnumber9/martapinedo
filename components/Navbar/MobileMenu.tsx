import LanguageSwitcher from "components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { NavbarButton } from "./NavbarButton";

interface Props {
    onClickLink: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const MobileMenu: React.FC<Props> = ({ onClickLink, ref }) => {
    const t = useTranslations('navbar');
    return (
        <div ref={ref} className="mobile-menu sm:hidden fixed top-20 left-0 flex flex-col items-center justify-center bg-darkSecondary w-full shadow-lg z-40 h-full overflow-y-hidden gap-5">
            <hr className="mt-5 border-white/20" />
            <NavbarButton text={t('buttons.blog')} route="/blog" isMobile onClick={onClickLink} />
            <hr className="w-3/4 border-white/20" />
            <NavbarButton text={t('buttons.contact')} route="/contact" isMobile onClick={onClickLink} />
            <hr className="w-3/4 border-white/20" />
            <div className="w-full h-15 p-15 flex items-center justify-center text-4xl p-5">
                <LanguageSwitcher />
            </div>
        </div>
    )
};