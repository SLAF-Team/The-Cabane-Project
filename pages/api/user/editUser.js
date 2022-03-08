import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { id, name, email, isowner } = req.body;
  try {
    const updateShack = await prisma.cabane.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        isowner,
      },
    });
    res.status(200).json(updateShack);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating a user." });
  }
};
