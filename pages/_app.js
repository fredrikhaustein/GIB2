import "../styles/global.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
