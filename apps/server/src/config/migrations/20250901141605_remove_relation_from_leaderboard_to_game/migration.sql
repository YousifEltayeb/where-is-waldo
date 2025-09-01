/*
  Warnings:

  - You are about to drop the column `gameId` on the `leaderboard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roundId]` on the table `leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."leaderboard" DROP CONSTRAINT "leaderboard_gameId_fkey";

-- AlterTable
ALTER TABLE "public"."leaderboard" DROP COLUMN "gameId";

-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_roundId_key" ON "public"."leaderboard"("roundId");
