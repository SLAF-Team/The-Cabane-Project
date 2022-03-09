import { useRef, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


export default function AddShack({ closeModal }) {
  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);

  const formRef = useRef();
  const token = Cookies.get("token");
  // console.log("cookkkk")
  // console.log(jwt_decode(token));
  // console.log("userrr")
  // console.log(user.id)
  // console.log(jwt_decode(token));

  const handleChange = () => {
    setChecked(!checked);
  };


  async function addNewShack(params) {
    setDisable(true);
    const {
      addShackTitle,
      addShackPrice,
      addShackDescription,
      addShackImageUrl,
      addShackLocation,
      addShackPublished,
      addShackOwnerID,
    } = formRef.current;
    const title = addShackTitle.value;
    const price = addShackPrice.value;
    const description = addShackDescription.value;
    const imageUrl = addShackImageUrl.value;
    const location = Number.parseInt(addShackLocation.value,10);
    const published = checked;
    // avec useContext ou useAtom --> user.id
    const ownerId = ;
    await axios.post("/api/shack/addShack", {
      title,
      price,
      description,
      imageUrl,
      location,
      published,
      ownerId,
    },{headers:{Authorization:`Bearer ${token}`}});
    setDisable(false);
    window.location.reload();
  }


  return (
    <div className="modal-content">
      <div className="modal-header"></div>
      <div className="modal-body content">
        <form ref={formRef}>
          <div>
            <div
              style={{ flex: "1 1 100%", margin: "0 0 2px 5px" }}
              className="inputField"
            >
              <div className="label">
                <label>Title</label>
              </div>
              <div>
                <input name="addShackTitle" type="text" />
              </div>
            </div>
            <div
              style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
              className="inputField"
            >
              <div className="label">
                <label>Price</label>
              </div>
              <div>
                <input name="addShackPrice" type="text" />
              </div>
            </div>
            <div
              style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
              className="inputField"
            >
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  name="addShackDescription"
                  type="text"
                  style={{ width: "100%", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="inputField">
            <div className="label">
              <label>ImageUrl</label>
            </div>
            <div>
              <input name="addShackImageUrl" type="text" />
            </div>
          </div>
          <div className="inputField">
            <div className="label">
              <label>Location</label>
            </div>
            <div>
              <input name="addShackLocation" type="text"></input>
            </div>
          </div>
          <div className="inputField">
            <div>
              <input
                type="checkbox"
                name="addShackPublished"
                value={checked}
                onChange={handleChange}
              />
              Publier cette annonce ?
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button style={{ marginLeft: "0" }} onClick={() => closeModal()}>
          Annuler
        </button>
        <button
          disabled={disable}
          className="btn"
          onClick={() => addNewShack()}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
