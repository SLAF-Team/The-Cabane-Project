import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import shedLogo from "../../assets/images/shed.png";
import Image from "next/image";

export default function Navbar() {
  const { user } = useUserContext();
  // const [id, setId] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     setId(user.id);
  //   }
  // }, []);

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="d-flex justify-content-between container px-4">
        <div className="d-flex mx-4 px-4">
          <Image src={shedLogo} width="44" height="44" />
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark px-3 fw-bold fs-4">
              The Cabane Project
            </a>
          </Link>
        </div>
        <div className="d-flex mx-4 px-4">
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark fw-bold px-2">Home</a>
          </Link>
          <Link href="/shacks" exact>
            <a className="nav-item nav-link link-dark fw-bold px-2">
              Nos cabanes
            </a>
          </Link>
          {!user ? (
            <>
              <Link href="/signup" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Inscription
                </a>
              </Link>
              <Link href="/signin" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Connexion
                </a>
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <Link href="/profile" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Profil
                </a>
              </Link>
              <Link href="/signout" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Se déconnecter
                </a>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
