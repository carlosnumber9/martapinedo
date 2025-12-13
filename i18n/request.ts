import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';

const detectBestLocale = (acceptLanguage: string | null): string | null => {
  if (!acceptLanguage) return null;
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1] || '1');
      const locale = code.split('-')[0].toLowerCase();
      return { locale, quality };
    })
    .sort((a, b) => b.quality - a.quality);
  
  for (const { locale } of languages) {
    if (SUPPORTED_LOCALES.includes(locale as any)) {
      return locale;
    }
  }
  
  return null;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  let locale = cookieStore.get('LOCALE')?.value;
  
  if (!locale || !SUPPORTED_LOCALES.includes(locale as any)) {
    const acceptLanguage = headersList.get('accept-language');
    locale = detectBestLocale(acceptLanguage) || DEFAULT_LOCALE;
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});