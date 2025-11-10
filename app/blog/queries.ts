import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts(locales: [es_ES]) {
      id
      title
      subtitle
      publishDate
    }
  }
`;
