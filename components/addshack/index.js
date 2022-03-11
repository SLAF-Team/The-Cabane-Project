import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import Modalform from "../Modalform";

const AddShack = ({ closeModal }) => {
  const { user } = useUserContext();
  const router = useRouter();

  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");
  const display = true;

  const token = Cookies.get("token");

  useEffect(() => {
    setId(user.id);
  }, []);

  const handleChange = () => {
    setChecked(!checked);
  };

  async function addNewShack(form) {
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
    closeModal();
    router.push("/");
  }

  return (
    <Modalform
      disable={disable}
      closeModal={closeModal}
      shackFunction={addNewShack}
      checked={checked}
      handleChange={handleChange}
      displayNone={display}
    />
  );
};

export default AddShack;
