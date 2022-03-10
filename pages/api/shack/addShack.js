import { checkAuth, checkOwner } from "../../../lib/auth";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isOwner = await checkOwner(req);
  if (!isOwner) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const data = req.body;
  try {
    const result = await prisma.cabane.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    // afficher les champs qui sont pas valides
    res.status(400).json({ err: "Error" });
  }
};
