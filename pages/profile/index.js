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
  const [form, setForm] = useState(false)

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

  const handleUpdateUser = () => {
    setForm(!form);
  }

  return (
    <div className="my-3 row">
      <div className="col-9">
        <div className="text-center mb-3">
          <h2>Mes cabanes</h2>
        </div>
        <div className={styles.cards}>
          {currentUserShacks.map((shack) => (
            <>
              <ShackCard width="18.3vw" shack={shack} />
            </>
          ))}
        </div>
      </div>
      <div className="col-3 py-3">
        <div className={styles.shackCard}>
          <div className="text-center">
            <p className={classes.capitalize}>{user?.name}</p>
            <p className="fs-6 fw-bold">{user?.email}</p>
            <p className="fs-6 fw-bold">{user?.isowner? "Propriétaire" : "Visiteur"}</p>
          </div>
          <div className={styles.shackDivider}></div>
          <div className="text-center">
            <p className="fs-6 fw-bold">
              {currentUserShacks.length} Cabanes publiées
            </p>
            <a
              className="btn btn-primary mb-3"
              onClick={() => handleUpdateUser()}
            >
              Editer mon profil
            </a>
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
