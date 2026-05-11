import { prisma } from "../db";

export async function getDatabaseStatus() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      configured: true,
      message: "Database connected and verified."
    };
  } catch (error) {
    return {
      configured: false,
      message: "Database connection failed.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
