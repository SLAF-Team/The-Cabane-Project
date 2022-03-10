import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import classes from "./Profile.module.css";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const [currentUserShacks, setCurrentUserShacks] = useState([]);
  const [loadmore, setLoadmore] = useState(false);

  // get shacks
  async function getUserShacks() {
    const result = await axios.get("/api/shack/getCurrentUserShacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUserShacks(result.data.userShacks);
  }

  useEffect(() => {
    getUserShacks();
  }, []);

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

  return (
    <div className="my-3 row">
      <div className="col-9">
        <div className="text-center mb-3">
          <h2>Mes cabannes</h2>
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
      <div className="col-3 py-3">
        <div className={styles.shackCard}>
          <div className="text-center">
            <p className={classes.capitalize}>{user?.name}</p>
            <p className="fs-6 fw-bold">{user?.email}</p>
          </div>
          <div className={styles.shackDivider}></div>
          <div className="text-center">
            <p className="fs-6 fw-bold">
              {currentUserShacks.length} Cabanes publiées
            </p>
            <a className="btn btn-primary mb-3">Editer mon profil</a>
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
