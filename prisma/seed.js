const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    name: "Owner1234",
    email: "owner1234@yopmail.com",
    isowner: true,
  },
  {
    name: "Owner2345",
    email: "owner2345@yopmail.com",
    isowner: true,
  },
  {
    name: "Owner3456",
    email: "owner3456@yopmail.com",
    isowner: false,
  },
];

const cabanes = [
  {
    title: "Cabane grand standing",
    price: "500",
    description:
      "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source database in the world.",
    imageUrl:
      "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/news-tendances/les-plus-belles-cabanes-de-france/90648911-3-fre-FR/Les-plus-belles-cabanes-de-France.jpg",
    location: 38330,
    published: true,
    ownerId: 18,
  },
];

async function main() {
  // await prisma.cabane.deleteMany({});
  // await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: users,
  });

  await prisma.cabane.createMany({
    data: cabanes,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
