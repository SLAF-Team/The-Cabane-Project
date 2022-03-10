import prisma from '../../../lib/prisma.ts'

export default async (req, res) => {
  const { id, name, email, isowner } = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        isowner,
      },
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating a user." });
  }
};
