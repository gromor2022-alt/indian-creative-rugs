import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD is missing from .env"
    );
  }

  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("✅ Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      name: "Rajesh",
      email,
      password: hashedPassword,
    },
  });

  console.log("🎉 Admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });