import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";

const Profile = () => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [currentUserShacks, setCurrentUserShacks] = useState([]);

  async function getUserShacks() {
    const result = await axios.get("/api/shack/getCurrentUserShacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("resultat")
    console.log(result);
    setCurrentUserShacks(result.data.userShacks);
  }

  useEffect(() => {
    getUserShacks();
  }, []);

  const handleDeleteUser = () => {
    console.log("supressionnnnn");
    // ouvrir une modal pour confirmer le choix
    // déclencher la fonction dans l'API
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
