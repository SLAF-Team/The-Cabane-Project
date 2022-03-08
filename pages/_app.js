import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  console.log(Cookies.get("token"))
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
