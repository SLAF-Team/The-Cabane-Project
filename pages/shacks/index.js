import { useState } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import classes from "../../styles/Home.module.css"
import AddShack from "../../components/addshack/index";
import prisma from "../../lib/prisma.ts";
import { useUserContext } from "../../context/UserContext";

function Shacks(props) {
  const { user } = useUserContext();
  const [showAddShackModal, setShowAddShackModal] = useState(false);
  const shacks = props.shacks;

  return (
    <div>
      <div>
        <h2>Cabanes</h2>
        {user ? (
          <div>
            <button
              className="btn"
              style={{
                paddingLeft: "15px",
                paddingRight: "15px",
                fontWeight: "500",
              }}
              onClick={() => setShowAddShackModal((pV) => !pV)}
            >
              Ajouter une cabanne
            </button>
          </div>
        ) : null}
      </div>
      <div className={classes.cards}>
        {shacks?.map((shack, i) => (
          <ShackCard shack={shack} key={i} />
        ))}
      </div>
      {showAddShackModal ? (
        <AddShack closeModal={() => setShowAddShackModal(false)} />
      ) : null}{" "}
    </div>
  );
}

export async function getServerSideProps() {
  const allShacks = await prisma.cabane.findMany();
  return {
    props: {
      shacks: allShacks,
    },
  };
}

export default Shacks;
