import awsConfig from "@/lib/cognito";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// export default withAuthenticator(App);
export default App;