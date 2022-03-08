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
    </nav>
  );
}
