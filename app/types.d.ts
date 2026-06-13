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

export type CaseMetadata = Pick<Case, 'caseName' | 'description'>;

export type BlogPostMetadata = Pick<
  Post,
  'createdBy' | 'lastModificationDate' | 'publishDate' | 'publishedAt' | 'subtitle' | 'title' | 'updatedAt'
>;

export type BlogSitemapPost = Pick<Post, 'id' | 'lastModificationDate'>;

export type CaseSitemapItem = Pick<Case, 'id' | 'solvedAt'>;

export interface PostsResponse<PostType> {
  posts?: PostType[] | null;
}

export interface CasesResponse<CaseType> {
  cases?: CaseType[] | null;
}

export type SendingState = 'IDLE' | 'SENDING' | 'SENT' | 'ERROR';

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

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
