import Link from "next/link";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ShackPage = ({ shack}) => {

  return (
    <div>
      <h1>{shack.title}!</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const shack = await prisma.cabane.findUnique({
    where: { id: parseInt(id) },
  });
  return {
    props: {
      shack,
    },
  };
}

export default ShackPage;
