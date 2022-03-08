import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const Profile = (props) => {
  return (
    <div>
      <h1>{cabane?.title}!</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cabane = await prisma.cabane.findUnique({
    where: { id: parseInt(id) },
  });
  return {
    props: {
      cabane,
    },
  };
}

export default Profile;
