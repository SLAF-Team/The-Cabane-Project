import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

export default function EditShack({ closeModal, shack }) {
  const { user } = useUserContext();
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState("");
  const formRef = useRef();
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    setId(user.id);
  }, []);

  async function editShack() {
    setDisable(true);
    const {
      editShackTitle,
      editShackPrice,
      editShackDescription,
      editShackImageUrl,
      editShackLocation,
    } = formRef.current;
    const title = editShackTitle.value;
    const price = editShackPrice.value;
    const description = editShackDescription.value;
    const imageUrl = editShackImageUrl.value;
    const location = Number.parseInt(editShackLocation.value, 10);
    const published = true;
    const ownerId = id;
    await axios.put("/api/shack/editShack", {
      id: parseInt(shack?.id),
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
    closeModal();
    router.push(`/shacks/${shack?.id}`);
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Shack</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: "flex", margin: "2px 2px 0 0" }}>
              <div
                style={{ flex: "1 1 100%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Nom</label>
                </div>
                <div>
                  <input
                    defaultValue={shack?.title}
                    name="editShackTitle"
                    type="text"
                  />
                </div>
              </div>
              <div
                style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Prix</label>
                </div>
                <div>
                  <input
                    defaultValue={shack?.price}
                    name="editShackPrice"
                    type="text"
                  />
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
                  <input
                    defaultValue={shack?.description}
                    name="editShackDescription"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Image</label>
              </div>
              <div>
                <input
                  defaultValue={shack?.imageUrl}
                  name="editShackImageUrl"
                  type="text"
                />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Location</label>
              </div>
              <div>
                <textarea
                  defaultValue={shack?.location}
                  style={{ width: "100%", height: "100px" }}
                  name="editShackLocation"
                  type="text"
                ></textarea>
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  defaultValue={shack?.description}
                  style={{ width: "100%", height: "100px" }}
                  name="editShackDescription"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Annuler</button>
          <button disabled={disable} className="btn" onClick={() => editShack()}>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
