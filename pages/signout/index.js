import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

const SignOut = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleClick = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <button className="btn btn-danger" onClick={() => handleClick()}>
      Déconnexion ?
    </button>
  );
};

export default SignOut;
