import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function signUserUp(data) {
    await axios.post("/api/addUser", {
      ...data,
    });
    window.location.reload();
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: {
        name: name,
        email: email,
        password: password,
      },
    };
    console.log(data);
    signUserUp(data);
    // setUser(jwt_decode(Cookies.get("token")))
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>
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
