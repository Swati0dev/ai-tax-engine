import { User } from "@prisma/client";

export function canManageCalculations(user: User): boolean {
  return true; // As long as user is authenticated
}
