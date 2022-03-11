import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

const SignOut = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleClick = () => {
    if (window.confirm("Es tu sûr de vouloir te déconnecter?")) {
      Cookies.remove("token");
      setUser(null);
      router.push("/");
    }
  };

  return (
    <a
      className="nav-item nav-link link-dark fw-bold px-2 add"
      onClick={() => handleClick()}
    >
      Déconnexion
    </a>
  );
};

export default SignOut;
