import { PrismaClient } from "@prisma/client";
import { friendships, persons } from "./seed/data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.friendship.deleteMany();
  await prisma.person.deleteMany();

  await prisma.person.createMany({ data: persons });
  await prisma.friendship.createMany({ data: friendships });
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
