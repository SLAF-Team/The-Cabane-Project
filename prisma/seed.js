const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.cabane.deleteMany({});
  await prisma.user.deleteMany({});

  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john.doe@yopmail.com",
      isowner: true,
    },
  });

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
      ownerId: john.id,
    },
    {
      title: "Cabane merdique",
      price: "10",
      description:
        "Over the past two decades, Rails has taken countless companies to millions of users and billions in market valuations.",
      imageUrl:
        "https://img.20mn.fr/XLAEO2z7RDChzR3sMYuFwik/830x532_finistere-il-transforme-un-bunker-de-la-seconde-guerre-mondiale-en-un-gite-a-louer1.jpg",
      location: 38330,
      published: true,
      ownerId: john.id,
    },
    {
      title: "Kaban",
      price: "40",
      description: "Pas compris ce que je faisais là.",
      imageUrl:
        "https://www.vesnadesign.com.tr/Uploads/UrunResimleri/basic-kase-kaban-pembe-37a5f3.jpeg",
      location: 75011,
      published: true,
      ownerId: john.id,
    },
    {
      title: "AzCaban",
      price: "1000",
      description: "Un charme certain, du calme, de la solitude.",
      imageUrl:
        "https://img.20mn.fr/XLAEO2z7RDChzR3sMYuFwik/830x532_finistere-il-transforme-un-bunker-de-la-seconde-guerre-mondiale-en-un-gite-a-louer1.jpg",
      location: 75011,
      published: true,
      ownerId: john.id,
    },
  ];

  https: await prisma.user.createMany({
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
