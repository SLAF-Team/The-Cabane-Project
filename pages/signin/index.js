import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import classes from "../../styles/Home.module.css";

const SignIn = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function signUserIn(data) {
    const result = await axios.post("/api/user/logUserIn", {
      ...data,
    });
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(result.data.user);
    router.push("/profile");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    signUserIn(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={classes.forms}>
        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="text"
              onChange={handleEmail}
              className="form-control my-2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe *</label>
            <input
              id="password"
              type="password"
              onChange={handlePassword}
              className="form-control my-2"
            />
          </div>

          <button type="submit" className="btn btn-primary my-2">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
