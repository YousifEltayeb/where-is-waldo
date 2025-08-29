/*
  Warnings:

  - Added the required column `xEnd` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xStart` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yEnd` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yStart` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."characters" ADD COLUMN     "xEnd" INTEGER NOT NULL,
ADD COLUMN     "xStart" INTEGER NOT NULL,
ADD COLUMN     "yEnd" INTEGER NOT NULL,
ADD COLUMN     "yStart" INTEGER NOT NULL;
