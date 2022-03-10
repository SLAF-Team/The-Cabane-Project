import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
    const isAuth = await checkAuth(req);
    if (!isAuth) {
      res.status(403).json({ err: "Forbidden" });
      return;
    }
  const { authorization } = req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
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
