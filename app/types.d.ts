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
    html: string;
  };
  createdBy: {
    name: string;
    picture: string;
  };
}

export interface Case {
  id: string;
  heading: string;
  caseName: string;
  description: {
    text: string;
    html: string;
  };
  solvedAt: string;
}

export type BlogPostMetadata = Pick<Post, 'title'>;

export type BlogSitemapPost = Pick<Post, 'id' | 'lastModificationDate'>;

export interface PostsResponse<PostType> {
  posts?: PostType[] | null;
}

export interface CasesResponse<CaseType> {
  cases?: CaseType[] | null;
}

export type SendingState = 'IDLE' | 'SENDING' | 'SENT' | 'ERROR';

export type SupportedLocale = 'es' | 'en';
export interface Service {
  id: string;
  name: string;
  description: string;
}

export type SubmitButtonState = 'IDLE' | 'SENDING' | 'SENT' | 'ERROR';

export type Path =
  | '/'
  | '/blog'
  | '/cases'
  | `/cases/${string}`
  | '/contact'
  | `/blog/${string}`
  | '/legal';

export type IndexHeading = { title: string; level: number; id: string };

export type HeadingLevel = 2 | 3;
