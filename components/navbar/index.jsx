import Link from "next/link";
import styles from "./NavBar.module.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-nav container">
        <Link href="/" exact className="nav-item nav-link">
          Home
        </Link>
      </div>
      <div className="navbar-nav container">
        <Link href="/signup" exact className="nav-item nav-link">
          Inscription
        </Link>
      </div>
      <div className="navbar-nav container">
        <Link href="/signin" exact className="nav-item nav-link">
          Connexion
        </Link>
      </div>
      <div className="navbar-nav container">
        <Link href="/signout" exact className="nav-item nav-link">
          Déconnexion
        </Link>
      </div>
    </nav>
  );
}
