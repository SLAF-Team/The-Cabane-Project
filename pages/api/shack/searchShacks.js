import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  
  const data = req.body.filter;

  try {
    const result = await await prisma.cabane.findMany({
      where: {
        OR: [
          {
            description: {
              contains: data,
            },
          },
          {
            title: {
              contains: data,
            },
          },
        ],
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while searching shacks." });
  }
};
