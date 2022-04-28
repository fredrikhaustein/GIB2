import "../styles/global.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
