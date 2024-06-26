// prisma/seed.ts
import { PrismaClient } from '@prisma/client';


// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const data = await prisma.item.upsert({
    where: { id: "5c885c27-dcac-425a-9ad2-00e2faa9bc5e" },
    update: {},
    create: {
      text: 'OOAD Project',
    },
  });

  console.log({ data });
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });