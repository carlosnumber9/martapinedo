import { useLocale } from 'next-intl';

export const useFormatDate = () => {
    const locale = useLocale();

    return (publishDate: Date): string => {
        const now = new Date();
        const diffInMs = now.getTime() - publishDate.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

        if (diffInHours < 1) {
            return rtf.format(-diffInMinutes, 'minute');
        }

        if (diffInHours < 24) {
            return rtf.format(-diffInHours, 'hour');
        }

        if (diffInDays < 2) {
            return rtf.format(-diffInDays, 'day');
        }

        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            ...(publishDate.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
        };

        return new Intl.DateTimeFormat(locale, options).format(publishDate);
    };
};