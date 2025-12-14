import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($locale: Locale!) {
    posts(locales: [$locale]) {
      id
      title
      subtitle
      createdBy {
        name
      }
      publishDate
    }
  }
`;
