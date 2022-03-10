import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import { useRouter } from "next/router";


const Profile = () => {
    const router = useRouter();
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const [currentUserShacks, setCurrentUserShacks] = useState([]);

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

  async function deleteUser() {
    const id = user.id;
    const result = await axios.delete(
      "/api/user/deleteUser",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    router.push("/");
  }

  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <button
            className="btn btn-secondary"
            onClick={() => handleDeleteUser()}
          >
            Supprimer mon profil
          </button>
          <button className="btn btn-secondary">Editer mon profil</button>
          {currentUserShacks ? (
            <>
              {currentUserShacks.map((shack) => (
                <>
                  <h1>Mes cabannes</h1>
                  <ShackCard shack={shack} />
                </>
              ))}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Profile;
