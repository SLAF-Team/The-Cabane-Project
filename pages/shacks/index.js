import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import ShackCard from '../../components/shackcard/ShackCard'
import classes from './shacks.module.css';

const prisma = new PrismaClient();

function Shacks(props) {
  const shacks = props.shacks;

  return (
    <div>
      <div>
        <h2>Cabannes</h2>
      </div>
      <div className={classes.cards}>
        {shacks?.map((shack, i) => (
          <ShackCard shack={shack} key={i} />
        ))}
      </div>
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