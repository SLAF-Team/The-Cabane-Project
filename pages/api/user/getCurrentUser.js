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
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return false;
    }
    res.status(200).json({ user });
  } catch (err) {
    return false;
  }
};
