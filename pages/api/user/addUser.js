import { PrismaClient } from "@prisma/client";
import Cookies from "js-cookie";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
    const token = res.headers.get("Authorization");
    console.log(token)
    Cookies.set("token", token, { expires: 7 });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
