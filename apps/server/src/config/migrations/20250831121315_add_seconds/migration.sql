/*
  Warnings:

  - Added the required column `seconds` to the `leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."leaderboard" ADD COLUMN     "seconds" INTEGER NOT NULL;
