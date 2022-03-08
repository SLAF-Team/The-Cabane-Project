import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  if (Cookies.get("token") !== undefined) {
    const token = Cookies.get("token");
    setUser(jwt_decode(token));
  }
  console.log("cookie");
  console.log(Cookies.get("token"));
  console.log("user");
  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
