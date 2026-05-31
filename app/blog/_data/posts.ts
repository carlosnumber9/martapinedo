import 'server-only';

import {
  BlogPostMetadata,
  BlogSitemapPost,
  Post,
  PostsResponse,
  SupportedLocale,
} from 'app/types';
import { apolloClient } from 'utils/client';
import {
  GET_BLOG_POST_BY_ID,
  GET_BLOG_POST_METADATA,
  GET_BLOG_POSTS,
  GET_BLOG_SITEMAP_POSTS,
} from './queries';

export const getBlogPosts = async (locale: SupportedLocale): Promise<Post[]> => {
  const { data } = await apolloClient.query<PostsResponse<Post>>({
    query: GET_BLOG_POSTS,
    variables: { locale },
  });

  return data.posts ?? [];
};

export const getBlogPostById = async (
  id: string,
  locale: SupportedLocale
): Promise<Post | null> => {
  const { data } = await apolloClient.query<PostsResponse<Post>>({
    query: GET_BLOG_POST_BY_ID,
    variables: { id, locale },
  });

  return data.posts?.[0] ?? null;
};

export const getBlogPostMetadata = async (
  id: string,
  locale: SupportedLocale
): Promise<BlogPostMetadata | null> => {
  const { data } = await apolloClient.query<PostsResponse<BlogPostMetadata>>({
    query: GET_BLOG_POST_METADATA,
    variables: { id, locale },
  });

  return data.posts?.[0] ?? null;
};

export const getSitemapPosts = async (
  locale: SupportedLocale
): Promise<BlogSitemapPost[]> => {
  const { data } = await apolloClient.query<PostsResponse<BlogSitemapPost>>({
    query: GET_BLOG_SITEMAP_POSTS,
    variables: { locale },
  });

  return data.posts ?? [];
};
