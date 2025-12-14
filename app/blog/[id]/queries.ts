import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPostById($id: ID!, $locale: Locale!) {
    posts(where: { id: $id }, locales: [$locale]) {
      id
      title
      subtitle
      body {
        html
      }
      createdBy {
        name
        picture
      }
      publishDate
    }
  }
`;
