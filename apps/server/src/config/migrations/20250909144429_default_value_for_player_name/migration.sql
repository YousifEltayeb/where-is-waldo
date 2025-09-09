/*
  Warnings:

  - Made the column `playerName` on table `leaderboard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."leaderboard" ALTER COLUMN "playerName" SET NOT NULL,
ALTER COLUMN "playerName" SET DEFAULT 'Guest player';
