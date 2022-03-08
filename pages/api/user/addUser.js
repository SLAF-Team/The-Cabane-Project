import { PrismaClient } from "@prisma/client";
import Cookies from "js-cookie";
// import { useUserContext } from "../../../context/UserContext";
// import jwt_decode from "jwt-decode";

const prisma = new PrismaClient();

export default async (req, res) => {
  // const { setUser } = useUserContext();
  const data = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        ...data,
      },
    });
    // setUser(jwt_decode(Cookies.get("token")));
    res.status(200).json(result);
    const token = res.headers.get("Authorization");
    Cookies.set("token", token, { expires: 7 });
    console.log(token);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
