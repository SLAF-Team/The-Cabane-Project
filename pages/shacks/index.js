import { useState, useEffect } from "react";
import ShackCard from "../../components/shackcard/ShackCard";
import classes from "../../styles/Home.module.css";
import AddShack from "../../components/addshack/index";
import prisma from "../../lib/prisma.ts";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

function Shacks(props) {
  const [showAddShackModal, setShowAddShackModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [shacks, setShacks] = useState(props.shacks);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  async function getSearchedShacks(data) {
    const filter = data;
    const result = await axios.post("/api/shack/searchShacks", {
      filter,
    });
    setShacks(result.data);
  }

  useEffect(() => {
    getSearchedShacks(filter);
  }, [filter]);

  return (
    <div>
      <div>
        <div className="text-center my-3">
          <h2>Nos cabanes</h2>

          <div className="form-group">
            <input
              id="search"
              type="search"
              onChange={handleFilter}
              placeholder="Search"
              className="form-control my-2"
            />
          </div>
        </div>
      </div>

      <div className={classes.cards}>
        {shacks?.map((shack, i) => (
          <ShackCard width="30%" shack={shack} key={i} />
        ))}
      </div>
      {showAddShackModal ? (
        <AddShack closeModal={() => setShowAddShackModal(false)} />
      ) : null}
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
