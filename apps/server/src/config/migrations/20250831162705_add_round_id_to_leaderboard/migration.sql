/*
  Warnings:

  - Added the required column `roundId` to the `leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."leaderboard" ADD COLUMN     "roundId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."leaderboard" ADD CONSTRAINT "leaderboard_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
