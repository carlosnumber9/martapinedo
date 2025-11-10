import { Merriweather as Font } from 'next/font/google';

export const mainFont = Font({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
});
