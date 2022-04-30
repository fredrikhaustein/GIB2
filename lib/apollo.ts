// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
        uri: "gib2.vercel.app/api/graphql",
        cache: new InMemoryCache(),
});

export default apolloClient;
