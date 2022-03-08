import { useState } from "react";
import Cookies from "js-cookie";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      user: {
        email: email,
        password: password,
      },
    };
  }
  // A revoir avec méthode Next pour call Prisma

  //   fetch("http://localhost:3000/users/sign_in", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((res) => {
  //     if (res.ok) {
  //       const token = res.headers.get("Authorization");
  //       Cookies.set("token", token, { expires: 7 });
  //       return res.json();
  //     } else {
  //       throw new Error(res);
  //     }
  //   });
  // };

  return (
    <form onSubmit={handleSubmit}>

        <h1>Connexion</h1>

        <div className="form-group">
          <label htmlFor="email">Identifiant *</label>
          <input
            id="email"
            type="text"
            onChange={handleEmail}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe *</label>
          <input
            id="password"
            type="text"
            onChange={handlePassword}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >Connexion</button>
      </form>
  );
};

export default SignIn;
