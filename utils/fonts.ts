import { Maitree, Merriweather, Merriweather_Sans } from 'next/font/google';

export const mainFont = Merriweather({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
});

export const subtitleFont = Merriweather_Sans({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-subtitle',
  display: 'swap',
});

export const bodyFont = Maitree({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
