import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function test() {
  console.log("Prisma Client 导入成功");
  await prisma.$disconnect();
}

test().catch(console.error);
