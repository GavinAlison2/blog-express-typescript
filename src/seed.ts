import { PrismaClient, Prisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient().$extends(withAccelerate());

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

// const userDatas = Array.from({ length: 10 }, () => ({
//   name: faker.person.firstName(),
//   email: faker.internet.email(),
// }));
// let postDatas = Array.from({ length: 40 }, () => ({
//   title: faker.lorem.sentence(),
//   content: faker.lorem.paragraph(),
//   published: faker.datatype.boolean(),
//   authorId: 1, // 新增的字段，需要手动添加
// }));

async function main() {
  console.log(`Start seeding ...`);
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  // await prisma.user.createMany({
  //   data: userDatas,
  //   // skipDuplicates: true,//sqlite 不支持
  // });
  // const users = await prisma.user.findMany();
  // // 为postDatas数组的每个对象添加authorId字段
  // postDatas.forEach((post) => {
  //   const user = users[Math.floor(Math.random() * users.length)];
  //   post.authorId = user.id;
  // });
  // console.log(`postDatas:  ${postDatas}`);

  // console.log(`Created ${users.length} users`);
  // await prisma.post.createMany({
  //   data: postDatas,
  // });
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
