import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newPassword = "Admin@123"; // Change if you want

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: {
      email: "hello@indiancreativerugs.com",
    },
    data: {
      password: hashed,
    },
  });

  console.log("✅ Admin password updated successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });