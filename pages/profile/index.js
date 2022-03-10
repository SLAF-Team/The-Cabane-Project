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

  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      ) : null}
    </>
  );
};

export default Profile;



