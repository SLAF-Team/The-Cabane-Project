const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const images = [
  "https://images.unsplash.com/photo-1570793005386-840846445fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhY2t8ZW58MHx8MHx8&w=1000&q=80",
  "https://images.unsplash.com/photo-1580243981343-ca4d8f0143c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hhY2t8ZW58MHx8MHx8&w=1000&q=80",
  "https://images.unsplash.com/photo-1560931580-af17e379502e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hhY2t8ZW58MHx8MHx8&w=1000&q=80",
  "https://images.unsplash.com/photo-1515121124382-33ae0bf9417c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1605149943495-4405d69b018f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1498176126716-a01bc267f662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1500076898857-ad1ff4074429?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1524235520227-9989d7881f01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1541274387095-12117e6099dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1484026127540-d8fe960b53d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1584395659962-61c6ab17717a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1458934876533-9becb2380c47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1537790104900-87c10e649011?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1487278811744-bf61a8bd4858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1603646427435-2d6a9ff4ef08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1535373254831-0a72002623d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1489800862644-1b4aaec7c44f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1559634946-ca4cd0f4b880?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1509973372076-d88f6f8ba1b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHNoYWNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
];

async function main() {
  await prisma.cabane.deleteMany({});
  await prisma.user.deleteMany({});

  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john.doe@yopmail.com",
      isowner: true,
      password: "johndoe",
    },
  });

  const users = [
    {
      name: "Owner1234",
      email: "owner1234@yopmail.com",
      isowner: true,
      password: "123456",
    },
    {
      name: "Owner2345",
      email: "owner2345@yopmail.com",
      isowner: true,
      password: "123456",
    },
    {
      name: "Owner3456",
      email: "owner3456@yopmail.com",
      isowner: false,
      password: "123456",
    },
  ];

  const cabanes = [
    {
      title: "Cabane grand standing",
      price: "500",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
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
    {
      title: "Kanban",
      price: "0",
      description: "How we did Cabannes",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61cFdfpnSNL.jpg",
      location: 31000,
      published: true,
      ownerId: john.id,
    },
  ];

  for (let i = 0; i < 19; i++) {
    await prisma.cabane.create({
      data: {
        title: `Cabane v${i}`,
        price: "1000",
        description:
          "Construit sur un terrain de 1000 m ² à Hayama, préfecture de Kanagawa, la retraite océanique la plus célèbre du Japon, il s'agit d'un bâtiment blanc de trois étages sur le thème de la mer et de l'eau, d'une superficie totale de 600 m ². Il se trouve à 9 minutes en voiture de Zako et à 15 minutes en voiture de Kamakura. Vous pouvez également l'utiliser comme un studio.",
        imageUrl: images[i],
        location: 38300,
        published: true,
        ownerId: john.id,
      },
    });
  }

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
