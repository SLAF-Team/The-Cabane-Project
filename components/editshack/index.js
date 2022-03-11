import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import Modalform from "../Modalform";

export default function EditShack({ closeModal, shack }) {
  const { user } = useUserContext();
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState("");
  const formRef = useRef();
  const token = Cookies.get("token");
  const router = useRouter();
  const display = false;

  useEffect(() => {
    setId(user.id);
  }, []);

  async function editShack(form) {
    setDisable(true);
    const {
      shackTitle,
      shackPrice,
      shackDescription,
      shackImageUrl,
      shackLocation,
    } = form;
    const title = shackTitle;
    const price = shackPrice;
    const description = shackDescription;
    const imageUrl = shackImageUrl;
    const location = Number.parseInt(shackLocation, 10);
    const published = true;
    const ownerId = id;
    await axios.put(
      "/api/shack/editShack",
      {
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
    <Modalform
      title={shack?.title}
      price={shack?.price}
      description={shack?.description}
      imageUrl={shack?.imageUrl}
      location={shack?.location}
      disable={disable}
      closeModal={closeModal}
      shackFunction={editShack}
      displayNone={display}
    />
  );
}
