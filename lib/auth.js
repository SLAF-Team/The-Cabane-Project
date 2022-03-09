import prisma from "./prisma.ts";
import jwt from "jsonwebtoken";

export const checkAuth = async (request) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  //a faire : verifier la date d'expiration avec exp en faisant un check de la date du token vs Date.now
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
  } catch (err) {
    return false;
  }
  return true;
};

export const checkOwner = async (request) => {
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const { id } = jwt.verify(token, "coucou");
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user.isowner) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};
