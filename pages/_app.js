import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// verifier qu'un token existe dans les cookies, si il y a un token il est potentiellement connecté
// sinon, rediriger vers le login


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  console.log("token");
  console.log(token);
  if (token) {
    console.log("decode");
    console.log(jwt_decode(token));
  }
  console.log("user");
  console.log(user);

  const changeUser = () => {
    if (token !== undefined) {
      setUser(token);
    }
  };

  useEffect(() => {
    changeUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
