import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";

const SignUp = () => {
  const { setUser } = useUserContext();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setOwner] = useState(false);

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

  const handleCheck = () => {
    setOwner(!isOwner);
  };

  async function signUserUp(data) {
    const result = await axios.post("/api/user/addUser", {
      ...data,
    });
    console.log(result);
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(result.data.user);
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      isowner: isOwner,
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

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={handleCheck}
        />
        <label className="form-check-label">
          Je suis un propriétaire
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Inscription
      </button>
    </form>
  );
};

export default SignUp;
