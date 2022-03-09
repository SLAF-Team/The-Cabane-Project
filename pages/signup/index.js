import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import jwt_decode from "jwt-decode";

const SignUp = () => {

  const {setUser} = useUserContext()

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
    const result = await axios.post("/api/user/addUser", {
      ...data,
    });
    console.log(result);
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(jwt_decode(Cookies.get("token")))
    // window.location.reload();
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      // password: password,
    };
    console.log(data);
    signUserUp(data);
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
