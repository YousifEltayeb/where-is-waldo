import { PrismaClient, Difficulty } from '../generated/prisma';

export const prisma = new PrismaClient();
export { Difficulty };
