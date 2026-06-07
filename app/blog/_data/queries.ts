import { gql } from '@apollo/client';

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts($locale: Locale!) {
    posts(locales: [$locale]) {
      createdAt
      id
      lastModificationDate
      publishDate
      publishedAt
      title
      subtitle
      updatedAt
      body {
        text
        html
      }
      createdBy {
        name
        picture
      }
    }
  }
`;

export const GET_BLOG_POST_BY_ID = gql`
  query GetBlogPostById($id: ID!, $locale: Locale!) {
    posts(where: { id: $id }, locales: [$locale]) {
      createdAt
      id
      lastModificationDate
      publishDate
      publishedAt
      title
      subtitle
      updatedAt
      body {
        text
        html
      }
      createdBy {
        name
        picture
      }
    }
  }
`;

export const GET_BLOG_POST_METADATA = gql`
  query GetBlogPostMetadata($id: ID!, $locale: Locale!) {
    posts(where: { id: $id }, locales: [$locale]) {
      lastModificationDate
      publishDate
      publishedAt
      subtitle
      title
      updatedAt
      createdBy {
        name
      }
    }
  }
`;

export const GET_BLOG_SITEMAP_POSTS = gql`
  query GetBlogSitemapPosts($locale: Locale!) {
    posts(locales: [$locale]) {
      id
      lastModificationDate
    }
  }
`;
