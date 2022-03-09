import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { email } = req.body;
  try {
    // check si email bien envoyé
    if (!email) {
      return res.status(400).json({
        status: "error",
        error: "missing email",
      });
    } else {
      // check user DB - call prisma
      // https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      // if user doesn't exist
      if (!user) {
        res.status(400).json({ status: "error", error: "User Not Found" });
      } else {
        // + ajouter : comparaison user.password et password (isMatch - avec interface bcrypt ? )

        // if user exists

        // payload for the token
        // const payload = {
        //   // name: user.name,
        //   user
        //   // email: user.email,
        //   // isOwner: user.isowner,
        //   // password: user.password,
        // };

        const token = jwt.sign({ id: user.id, email: user.email }, "coucou");
        res.status(200).json({ user, token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
