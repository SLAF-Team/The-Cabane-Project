import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  // vérifier les authorisations
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }
  const { id } = req.body;
  // try le delete
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a user." });
  }
};
