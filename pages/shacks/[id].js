import prisma from "../../lib/prisma.ts";
import { useState, useRef, useEffect } from "react";
import classes from "../../styles/Home.module.css";
import { useUserContext } from "../../context/UserContext";
import EditShack from "../../components/editshack/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ShackPage = ({ shack }) => {
  const { user } = useUserContext();
  const [id, setId] = useState("");
  const token = Cookies.get("token");
  const [showEditShackModal, setShowEditShackModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setId(user?.id);
  }, []);

  async function deleteShack() {
    if (window.confirm("Souhaitez vous supprimer cette cabane?")) {
      await axios.delete(`/api/shack/${shack?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/");
    }
  }

  return (
    <div className="my-3 row">
      <div className="col-9">
        <div className={classes.shackMedia}>
          <div
            className={classes.shackImg}
            style={{ backgroundImage: `url(${shack?.imageUrl})` }}
          ></div>
        </div>

        <div className="row my-2">
          <div className="col-10">
            <h3>{shack?.title}!</h3>
          </div>
          <div className="col-2 text-end">
            <span className="fs-4 fw-bold">{shack?.price} €</span>
          </div>
        </div>
        <div className="mb-2">
          <p>
            Situé à <span className={classes.shackLoc}>{shack?.location}</span>
          </p>
        </div>
        <div>
          <h3>Description du bien</h3>
          <p>{shack?.description}</p>
        </div>
      </div>
      <div className="col-3">
        <div className={classes.shackCard}>
          <div className="text-center my-2">
            <p className="fs-6 fw-bold">Agence de {shack?.owner.name}</p>
          </div>
          <div className={classes.shackDivider}></div>
          <div className="text-center">
            {user?.id == shack.owner.id && (
              <div className="mb-3">
                <span>
                  <button
                    onClick={() => setShowEditShackModal((pV) => !pV)}
                    style={{ marginLeft: "0" }}
                    className="btn me-1 btn-outline-secondary"
                  >
                    Modifier
                  </button>
                  <button onClick={deleteShack} className="btn me-1 btn-danger">
                    Supprimer
                  </button>
                </span>
              </div>
            )}
            {user ? (
              <a
                className="btn btn-secondary"
                href={"mailto:" + shack?.owner.email}
              >
                Contacter le propriétaire
              </a>
            ) : (
              <a className="btn btn-secondary" href={"/signin"}>
                Contacter le propriétaire
              </a>
            )}
          </div>
        </div>
      </div>
      {showEditShackModal ? (
        <EditShack
          shack={shack}
          closeModal={() => setShowEditShackModal(false)}
        />
      ) : null}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const shack = await prisma.cabane.findUnique({
    where: { id: parseInt(id) },
    include: { owner: { select: { email: true, name: true, id: true } } },
  });
  return {
    props: {
      shack,
    },
  };
}

export default ShackPage;
