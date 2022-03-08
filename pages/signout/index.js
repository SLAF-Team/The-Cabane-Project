import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";

const SignOut = () => {
  const { setUser } = useUserContext();

  const handleClick = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <button className="btn btn-danger" onClick={() => handleClick()}>
      Déconnexion ?
    </button>
  );
};

export default SignOut;
