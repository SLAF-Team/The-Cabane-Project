import { PrismaClient } from "@prisma/client";
import prisma from '../../../lib/prisma.ts'


export default async (req, res) => {
  const { id } = req.body;
  try {
    const deleteShack = await prisma.cabane.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteShack);
  } catch (error) {
    res.status(403).json({ err: "Error occured while deleting a Shack item." });
  }
};
