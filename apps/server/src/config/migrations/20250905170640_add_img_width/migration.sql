/*
  Warnings:

  - Added the required column `imgWidth` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."games" ADD COLUMN     "imgWidth" INTEGER NOT NULL;
