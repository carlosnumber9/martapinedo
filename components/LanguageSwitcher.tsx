'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { SupportedLocale } from 'app/types';

export default function LanguageSwitcher() {
    const router = useRouter();
    const currentLocale = useLocale();

    const changeLanguage = (newLocale: SupportedLocale) => {
        document.cookie = `LOCALE=${newLocale}; path=/; max-age=31536000`;
        router.refresh();
    };

    const getNextLocale = (): SupportedLocale => currentLocale === 'es' ? 'en' : 'es';

    return (
        <div>
            <button
                onClick={() => changeLanguage(getNextLocale())}
                className='mx-2'
            >
                <Image src={`/${getNextLocale()}.png`} alt={getNextLocale() === 'es' ? 'Español' : 'English'} width={40} height={35} />
            </button>
        </div>
    );

}