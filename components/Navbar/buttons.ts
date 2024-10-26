export interface ButtonConfig {
  text: string;
  route: string;
}

export const buttons: ButtonConfig[] = [
  { text: 'The blog', route: '/blog' },
  { text: 'Contact', route: '/contact' },
];
