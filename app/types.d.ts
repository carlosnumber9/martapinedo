export interface Post {
  createdAt: string;
  id: string;
  lastModificationDate: string;
  publishDate: string;
  publishedAt: string;
  subtitle: string;
  title: string;
  updatedAt: string;
  body: {
    text: string;
  };
  createdBy: {
    name: string;
    picture: string;
  };
}

export type SendingState = 'IDLE' | 'SENDING' | 'SENT' | 'ERROR';

export type SupportedLocale = 'es' | 'en';

