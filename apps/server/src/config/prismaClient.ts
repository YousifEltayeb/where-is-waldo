// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient, Difficulty } from '../generated/prisma';

export const prisma = new PrismaClient();
export { Difficulty };
