import { checkAuth, checkIfOwnerIsMe } from "../../../lib/auth";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { id } = req.query;

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  // const isTheOwner = await checkIfOwnerIsMe(req, id);
  // if (!isTheOwner) {
  //   res.status(403).json({ err: "Forbidden" });
  //   return;
  // }

  try {
    const deleteShack = await prisma.cabane.delete({
      where: {
        id: Number.parseInt(id, 10),
      },
    });

    res.status(200).json(deleteShack);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Shack item." });
  }
};
