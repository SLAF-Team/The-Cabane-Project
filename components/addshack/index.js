import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";

export default function AddShack({ closeModal }) {
  const { user } = useUserContext();

  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");

  const formRef = useRef();
  const token = Cookies.get("token");

  useEffect(() => {
    setId(user.id);
  }, []);

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
    const location = Number.parseInt(addShackLocation.value, 10);
    const published = checked;
    const ownerId = id;
    await axios.post(
      "/api/shack/addShack",
      {
        title,
        price,
        description,
        imageUrl,
        location,
        published,
        ownerId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
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
            Ajouter !
          </button>
        </div>
      </div>
    </div>
  );
}
