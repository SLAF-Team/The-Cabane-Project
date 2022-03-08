import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

const token = Cookies.get("token");

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);

  try {
    setUser(jwtDecode(token));
    setConnected(true);
  } catch {
    console.log("No user connected");
  }

  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
