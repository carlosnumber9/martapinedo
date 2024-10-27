export interface ButtonConfig {
  text: string;
  route: string;
}

export const buttons: ButtonConfig[] = [
  { text: 'The blog', route: '/blog' },
  { text: 'Services', route: '/services' },
  { text: 'About me', route: '/about' },
];
