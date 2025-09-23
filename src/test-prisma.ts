// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

async function test() {
  console.log("Prisma Client 导入成功");
  await prisma.$disconnect();
}

// test().catch(console.error);
main().catch(console.error);
