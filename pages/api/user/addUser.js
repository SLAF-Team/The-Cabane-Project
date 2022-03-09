import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    const token = jwt.sign(user, 'coucou');
    res.status(200).json({user, token});
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};