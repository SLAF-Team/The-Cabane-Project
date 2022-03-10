import { useUserContext } from "../../context/UserContext";

const Users = () => {
  const { user } = useUserContext();

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

export default Users;
