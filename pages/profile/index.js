import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import classes from "./Profile.module.css";
import UpdateUserForm from "../../components/edituser/index";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const [currentUserShacks, setCurrentUserShacks] = useState([]);
  const [loadmore, setLoadmore] = useState(false);
  const [form, setForm] = useState(false);

  // get shacks
  async function getUserShacks() {
    const result = await axios.get("/api/shack/getCurrentUserShacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUserShacks(result.data.userShacks);
  }

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      getUserShacks();
    }
  }, [user]);

  // delete user
  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(null);
    router.push("/");
  }

  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  const handleClick = () => {
    setLoadmore(true);
  };

  const handleUpdateUser = () => {
    setForm(!form);
  };

  return (
    <div className="my-3 row">
      {user?.isowner ? (
        <div className={classes.mySchacks}>
          <div className="text-center mb-3">
            <h2>Mes cabanes</h2>
          </div>
          <div className={styles.cards}>
            {currentUserShacks.slice(0, 6).map((shack) => (
              <>
                <ShackCard width="18.3vw" shack={shack} />
              </>
            ))}
            {loadmore &&
              currentUserShacks.slice(6).map((shack) => (
                <>
                  <ShackCard width="18.3vw" shack={shack} />
                </>
              ))}
          </div>
          {!loadmore && (
            <div className="text-center">
              <a className="btn btn-outline-secondary" onClick={handleClick}>
                Charger plus
              </a>
            </div>
          )}
        </div>
      ) : null}

      <div className="col-3 py-3">
        <div className={styles.shackCard}>
          <div className="text-center">
            <p className={classes.capitalize}>Bonjour {user?.name} !</p>
            <p className="fs-6 fw-bold">{user?.email}</p>
            <p className="fs-6 fw-bold">
              Statut : {user?.isowner ? "Propriétaire" : "Visiteur"}
            </p>
          </div>
          <div className={styles.shackDivider}></div>
          <div className="text-center">
            <p className="fs-6 fw-bold">
              {currentUserShacks.length} Cabanes publiées
            </p>
            {!form && (
              <a
                className="btn btn-primary mb-3"
                onClick={() => handleUpdateUser()}
              >
                Editer mon profil
              </a>
            )}
            {form ? <UpdateUserForm user={user} /> : null}
            <a className="btn btn-danger" onClick={() => handleDeleteUser()}>
              Supprimer mon profil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
