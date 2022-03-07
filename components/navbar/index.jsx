import Link from "next/link";
import styles from "./NavBar.module.css";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <Link href="/" exact className="nav-item nav-link">
          Home
        </Link>
      </div>
    </nav>
  );
}
