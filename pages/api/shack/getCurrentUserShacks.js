import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const { id } = jwt.verify(token, "coucou");
    if (!id) {
      return false;
    }
    const userShacks = await prisma.cabane.findMany({
      where: {
        ownerId: id
      },
    })
    if (!userShacks) {
      return false;
    }
    res.status(200).json({ userShacks });
  } catch (err) {
    return false;
  }
};
