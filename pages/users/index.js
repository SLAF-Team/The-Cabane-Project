import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import jwt from "jsonwebtoken";

const Users = () => {
  const { user } = useUserContext();
  let profile = "";

  if (user) {
    profile = jwt.verify(user, "coucou");
  }

  return (
    <div>
      <h2>{profile.email}</h2>
    </div>
  );
};

export default Users;
