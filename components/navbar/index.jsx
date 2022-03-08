import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import styles from "./NavBar.module.css";

export default function Navbar() {
  const { user } = useUserContext();

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-nav container">
        <Link href="/" exact className="nav-item nav-link">
          Home
        </Link>
        {!user ? (
          <>
            <Link href="/signup" exact className="nav-item nav-link">
              Inscription
            </Link>
            <Link href="/signin" exact className="nav-item nav-link">
              Connexion
            </Link>
          </>
        ) : null}
        {user ? (
          <Link href="/signout" exact className="nav-item nav-link">
            Déconnexion
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
