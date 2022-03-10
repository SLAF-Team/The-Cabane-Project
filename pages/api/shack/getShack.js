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
    const result = await prisma.cabane.findUnique({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
