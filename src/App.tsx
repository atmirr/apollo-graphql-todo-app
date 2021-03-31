import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { typePolicies, errorVar } from './graphql/typePolicies';
import ErrorSnackbar from './components/ErrorSnackbar';
import Main from './Main';

function App() {
  const cache = new InMemoryCache({
    typePolicies,
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_URI,
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        // As this is a sample project,
        // it is not a problem to store the secret in env variable
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(
    ({ graphQLErrors, networkError, forward, operation }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message }) => {
          errorVar(message);
        });
      /* eslint-disable no-console */
      if (networkError) console.log(`[Network error]: ${networkError}`);
      return forward(operation);
    },
  );

  const client = new ApolloClient({
    cache,
    // Chain all of our links together
    link: from([errorLink, authLink, httpLink]),
    defaultOptions: {
      // We're ignoring the trowing errors in our react app,
      // because we handle them in top-level as an error link
      query: {
        errorPolicy: 'ignore',
      },
      mutate: {
        errorPolicy: 'ignore',
      },
    },
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <Main />
      <ErrorSnackbar />
    </ApolloProvider>
  );
}

export default App;
