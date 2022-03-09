import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");

// fetch user (if user connected)
  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(result);
    setUser(result.data.user);
  }
  useEffect(() => {
    getUser();
  }, []);

  console.log("voici le user");
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
