import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";

const store = require("store");

const cache = new InMemoryCache();

const port = process.env.PORT || 4000;

console.log(port);

const httpLink = new HttpLink({ uri: `http://localhost:${port}/graphql` });

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.log(`[GraphQL Errors ] Message: ${message} Path: ${path}`);
    });
  }

  if (networkError) {
    console.log([
      `[network error] Message: ${networkError.message} Operation: ${
        operation.operationName
      }`
    ]);
  }
});

const authLink = setContext((_, { headers, ...rest }) => {
  const token = store.get("authToken");
  const context = {
    ...rest,
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
  return context;
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authLink, httpLink])
});

export default client;
