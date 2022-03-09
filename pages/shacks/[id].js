import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import prisma from '../../lib/prisma.ts'
import { useReducer } from "react";
import classes from "./Shacks.module.css";
import { useUserContext } from "../../context/UserContext";


const ShackPage = ({ shack }) => {
  const { user } = useUserContext();

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
            {user && <p>{shack?.owner.email}</p>}
            <p className="fs-6 fw-bold">Agence de {shack?.owner.name}</p>
          </div>
          <div className={classes.shackDivider}></div>
          <div className="text-center">
            <a
              className="btn btn-primary"
              href={"mailto:" + shack?.owner.email}
            >
              Contacter le propriétaire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const shack = await prisma.cabane.findUnique({
    where: { id: parseInt(id) },
    include: { owner: { select: { email: true, name: true } } },
  });
  return {
    props: {
      shack,
    },
  };
}

export default ShackPage;
