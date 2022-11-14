import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'; 

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
const link = createHttpLink({ uri: "http://localhost:3000/graphql" });
const client = new ApolloClient({ link: link, cache: new InMemoryCache() });
root.render(
  <ApolloProvider client={client}>
    <QueryClientProvider client = {queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen=  {false} />
    </QueryClientProvider>
  </ApolloProvider>
);
