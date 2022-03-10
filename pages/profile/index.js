import { useUserContext } from "../../context/UserContext";

const Profile = () => {
  const { user } = useUserContext();

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

export default Profile;
