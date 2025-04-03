'use client';

import { type PropsWithChildren } from 'react';
import { ApolloLink, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { getCookie } from 'cookies-next/client';

import { refreshToken } from '@/core/auth/services';

const authLink = new ApolloLink((operation, forward) => {
  const token = getCookie('accessToken');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const client = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          return new Observable(observer => {
            refreshToken()
              .then(newToken => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: `Bearer ${newToken}`,
                  },
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                forward(operation).subscribe(subscriber);
              })
              .catch(error => {
                observer.error(error);
              });
          });
        }
      }
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, httpLink]),
  });
};

export function ApolloProvider({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}
