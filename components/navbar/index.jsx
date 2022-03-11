import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import styles from "./NavBar.module.css";
import { useState } from "react";
import shedLogo from "../../assets/images/shed.png";
import Image from "next/image";
import AddShack from "../addshack/index";
import SignOut from "../signOut/index";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user } = useUserContext();
  const [showAddShackModal, setShowAddShackModal] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      setShowAddShackModal((pV) => !pV);
    } else {
      router.push("/signin");
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="d-flex justify-content-between container px-4">
        <div className="d-flex mx-4 px-4">
          <Image src={shedLogo} width="40" height="40" />
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark px-3 fw-bold fs-4">
              The Cabane Project
            </a>
          </Link>
        </div>
        <div className="d-flex mx-4 px-4">
          {user?.isowner ? (
            <a
              className="nav-item nav-link link-dark fw-bold px-2 add"
              onClick={handleClick}
            >
              Ajouter une cabane
            </a>
          ) : null}
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
              <SignOut />
            </>
          ) : null}
        </div>
      </div>
      {showAddShackModal ? (
        <AddShack closeModal={() => setShowAddShackModal(false)} />
      ) : null}{" "}
    </nav>
  );
}
