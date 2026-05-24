import { PrismaClient } from "../lib/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.user.updateMany({
    where: { isAdmin: true, role: "USER" },
    data: { role: "ADMIN" },
  });
  console.log(`Updated ${result.count} admin users to role=ADMIN`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
