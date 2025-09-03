// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient, Difficulty, Prisma } from '../generated/prisma';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Round } from '../generated/prisma';
export const prisma = new PrismaClient();

export { Difficulty, Prisma, Round };
