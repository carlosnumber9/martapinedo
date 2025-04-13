import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.CONTENT_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
  ssrMode: true,
});
