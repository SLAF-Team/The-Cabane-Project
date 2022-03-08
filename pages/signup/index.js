import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const SignUp = () => {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // fonction de fetch à changer pour call API Prisma
  const fetchRegisterForm = (data) => {
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          const token = res.headers.get("Authorization");
          Cookies.set("token", token, { expires: 7 });
          // history(`/`);
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then((json) => console.dir(json))
      .catch((err) => console.error(err));
  };

  // Handling the form submission + fetch data + update state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      const data = {
        user: {
          name: name,
          email: email,
          password: password,
        },
      };
      console.log(data);
      // setSubmitted(true);
      // setError(false);
      // fetchRegisterForm(data);
      // setUser(jwt_decode(Cookies.get("token")))
    }
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className="form-group">
        <label>Nom</label>

        <input
          onChange={handleName}
          className="form-control"
          value={name}
          type="text"
        />
      </div>
      <div className="form-group">
        <label>Email</label>

        <input
          onChange={handleEmail}
          className="form-control"
          value={email}
          type="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>

        <input
          onChange={handlePassword}
          className="form-control"
          value={password}
          type="text"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Inscription
      </button>
    </form>
  );
};

export default SignUp;
