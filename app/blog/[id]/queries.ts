import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPostById($id: ID!) {
    posts(where: { id: $id }, locales: [es_ES]) {
      id
      title
      subtitle
      body {
        html
      }
      publishDate
    }
  }
`;
