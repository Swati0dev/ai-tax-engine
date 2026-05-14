import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function verify() {
  const items = await prisma.taxKnowledgeItem.findMany({
    select: { slug: true, title: true }
  });
  console.log(`Found ${items.length} items:`);
  items.forEach(item => console.log(`- ${item.slug}: ${item.title}`));
}

verify()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
