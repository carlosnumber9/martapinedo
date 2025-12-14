import LanguageSwitcher from "components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
    onClose: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const MobileMenu: React.FC<Props> = ({ onClose, ref }) => {
    const t = useTranslations('navbar');
    return (
        <div ref={ref} className="mobile-menu sm:hidden fixed top-20 left-0 flex flex-col items-center justify-center bg-darkSecondary w-full shadow-lg z-40 h-full overflow-y-hidden">
            <Link href="/blog" className="w-full h-15 p-5 border-solid border-t-2 border-b-2 border-darkPrimary" onClick={onClose}>
                <div className="w-full h-15 p-15 flex items-center justify-center text-4xl">
                    {t('buttons.blog')}
                </div>
            </Link>
            <Link href="/contact" className="w-full h-15 p-5 border-solid border-b-2 border-darkPrimary" onClick={onClose}>
                <div className="w-full h-15 p-15 flex items-center justify-center text-4xl">
                    {t('buttons.contact')}
                </div>
            </Link>
            <div className="w-full h-15 p-15 flex items-center justify-center text-4xl p-5">
                <LanguageSwitcher />
            </div>
        </div>
    )
};