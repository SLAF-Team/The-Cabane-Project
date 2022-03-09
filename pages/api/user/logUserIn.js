import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    // check si email bien envoyé
    if (!data) {
      return res.status(400).json({
        status: "error",
        error: "missing email",
      });
    }

    // check user DB - call prisma
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
    const user = await prisma.user.findUnique({
      where: {
        email: data.data.email,
      },
    });

    // if user doesn't exist
    if (!user) {
      res.status(400).json({ status: "error", error: "User Not Found" });
    }
    // + ajouter : comparaison user.password et password (isMatch - avec interface bcrypt ? )

    // if user exists

    // payload for the token
    const payload = {
      // name: user.name,
      id: user.id,
      // email: user.email,
      // isOwner: user.isowner,
      // password: user.password,
    };
    // définition token avec payload
    const token = jwt.sign(payload, "coucou");

    // response : un statut + le token + user
    res.status(200).json({
      success: true,
      token: token,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
