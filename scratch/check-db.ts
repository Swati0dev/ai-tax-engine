import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const items = await prisma.taxKnowledgeItem.findMany({
    select: { id: true, slug: true, title: true }
  });
  console.log(JSON.stringify(items, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
