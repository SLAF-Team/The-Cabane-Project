import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 8);
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    const token = jwt.sign(user.id, 'coucou');
    res.status(200).json({user, token});
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
