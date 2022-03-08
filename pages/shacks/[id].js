import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import classes from "./shacks.module.css";

const prisma = new PrismaClient();

const ShackPage = ({ shack, user }) => {
  return (
    <div className="mb-4 row">
      <div className="col-10">
        <div
          className={classes.shackImg}
          style={{ backgroundImage: `url(${shack?.imageUrl})` }}
        ></div>
        <div className="row my-2">
          <div className="col-10">
            <h3>{shack?.title}!</h3>
          </div>
          <div className="col-2 text-end">
            <span className="fs-4 fw-bold">{shack?.price} €</span>
          </div>
        </div>
        <div className="mb-2">
          <span>{shack?.location}</span>
        </div>
        <div>
          <h3>Description du bien</h3>
          <p>{shack?.description}</p>
        </div>
      </div>
      <div className="col-2">
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const shack = await prisma.cabane.findUnique({
    where: { id: parseInt(id) },
    include: { owner: { select: { email: true } } },
  });
  return {
    props: {
      shack,
    },
  };
}

export default ShackPage;
