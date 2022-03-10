import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";

const Profile = () => {
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const [currentUserShacks, setCurrentUserShacks] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function getUserShacks() {
    const result = await axios.get("/api/shack/getCurrentUserShacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUserShacks(result.data.userShacks);
  }

  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: user.id },
    });
    console.log("resultat");
    console.log(result);
    setUser(null);
    window.location = "/";
  }

  useEffect(() => {
    getUserShacks();
  }, []);

  const handleDeleteUser = () => {
    if (confirmDelete === true) {
      deleteUser();
    }
    setConfirmDelete(!confirmDelete);
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
            {confirmDelete ? "Gooo for delete" : "Supprimer mon profil"}
          </button>
          <button className="btn btn-secondary">Editer mon profil</button>
          {currentUserShacks ? (
            <>
              <h1>Mes cabannes</h1>
              {currentUserShacks.map((shack) => (
                <>
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
