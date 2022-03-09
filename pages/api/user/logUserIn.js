import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";
const bcrypt = require("bcrypt");

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: "missing email or password",
      });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
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
        bcrypt.compare(password, user.password).then(isMatch => {
        res.status(200).json({ user, token });
      })
      }
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
