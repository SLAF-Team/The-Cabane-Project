import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

export default function AddShack({ closeModal }) {
  const { user } = useUserContext();
  const router = useRouter();

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
    router.push("/");
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header"></div>
        <div className="modal-body content">
          <form ref={formRef} className="form">
            <div className="form-group">
              <div className="label">
                <label>Nom</label>
              </div>
              <div>
                <input
                  className="form-control my-2"
                  name="addShackTitle"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label">
                <label>Price</label>
              </div>
              <div>
                <input
                  className="form-control my-2"
                  name="addShackPrice"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  name="addShackDescription"
                  type="text"
                  className="form-control my-2"
                  style={{ width: "100%", height: "100px" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label">
                <label>ImageUrl</label>
              </div>
              <div>
                <input
                  className="form-control my-2"
                  name="addShackImageUrl"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label">
                <label>Location</label>
              </div>
              <div>
                <input
                  className="form-control my-2"
                  name="addShackLocation"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="form-group d-flex justify-content-center">
              <div>
                <input
                  type="checkbox"
                  name="addShackPublished"
                  value={checked}
                  onChange={handleChange}
                  className="my-3 mx-2"
                />
                Publier cette annonce ?
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            style={{ marginLeft: "0" }}
            onClick={() => closeModal()}
          >
            Annuler
          </button>
          <button
            disabled={disable}
            className="btn btn-secondary"
            onClick={() => addNewShack()}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
