import { gql } from '@apollo/client';

export const GET_CASES = gql`
  query GetCases($locale: Locale!) {
    cases(locales: [$locale], orderBy: solvedAt_DESC) {
      id
      heading
      caseName
      description {
        text
        html
      }
      solvedAt
    }
  }
`;

export const GET_CASE = gql`
  query GetCaseById($id: ID!, $locale: Locale!) {
    cases(where: { id: $id }, locales: [$locale]) {
      id
      heading
      caseName
      description {
        text
        html
      }
      solvedAt
    }
  }
`;
