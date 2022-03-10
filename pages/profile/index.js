import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from 'react';

const Profile = () => {
  const { user } = useUserContext();
  
    const token = Cookies.get('token');
  async function getUserShacks() {
    const result = await axios.get("/api/shack/getCurrentUserShacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(result.data.userShacks);
  }
  useEffect(() => {
    getUserShacks();
  }, []);

  const handleDeleteUser =() => {
console.log("supressionnnnn")
// ouvrir une modal pour confirmer le choix
// déclencher la fonction dans l'API
  }
  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <button className="btn btn-secondary" onClick={() => handleDeleteUser()}>Supprimer mon profil</button>
          <button className="btn btn-secondary">Editer mon profil</button>
        </div>
      ) : null}
    </>
  );
};

export default Profile
