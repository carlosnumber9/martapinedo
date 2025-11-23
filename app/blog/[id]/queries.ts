import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPostById($id: ID!) {
    posts(where: { id: $id }, locales: [es]) {
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
