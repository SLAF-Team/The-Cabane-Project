import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body.filter;

  try {
    const result = await await prisma.cabane.findMany(
      {
        where: {
          OR: [
            {
              description: {
                contains: data,
                mode: "insensitive",
              },
            },
            {
              title: {
                contains: data,
                mode: "insensitive",
              },
            },
          ],
        },
      },
      {
        orderBy: {
          createdAt: "asc",
        },
      }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while searching shacks." });
  }
};
