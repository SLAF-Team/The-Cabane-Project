import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import styles from "./NavBar.module.css";
import jwt from "jsonwebtoken";

export default function Navbar() {
  const { user } = useUserContext();
  let id = "";

  if(user) {
    id = jwt.verify(user, "coucou");
    console.log(id);
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="d-flex justify-content-center container">
        <Link href="/" exact>
          <a className="nav-item nav-link px-2">Home</a>
        </Link>
        {!user ? (
          <>
            <Link href="/signup" exact className="nav-item nav-link px-2">
              <a className="nav-item nav-link px-2">Inscription</a>
            </Link>
            <Link href="/signin" exact className="nav-item nav-link px-2">
              <a className="nav-item nav-link px-2">Connexion</a>
            </Link>
          </>
        ) : null}
        {user ? (
          <>
            <Link href="/signout" exact>
              <a className="nav-item nav-link px-2">Déconnexion</a>
            </Link>
            <Link href={"/users/" + id} exact>
              <a className="nav-item nav-link px-2">My profile</a>
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
