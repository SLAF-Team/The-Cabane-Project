import { useState } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import classes from "../../styles/Home.module.css";
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
        <div className="text-center my-3">
          <h2>Nos cabanes</h2>
        </div>
      </div>
      <div className={classes.cards}>
        {shacks?.map((shack, i) => (
          <ShackCard width="30%" shack={shack} key={i} />
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
