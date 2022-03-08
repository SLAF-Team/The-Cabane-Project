import Cookies from "js-cookie";
import { useState } from "react"

const SignOut = () => {
const [active, setActive] = useState(false)

const handleClick =() => {
  setActive(true);
  Cookies.remove("token")
}
  return (
    <button className="btn btn-danger" onClick={() => handleClick()}>
      Déconnexion ?
    </button>
  );
}

export default SignOut