-- DropForeignKey
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_gameId_fkey";

-- AlterTable
ALTER TABLE "public"."characters" ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE SET NULL ON UPDATE CASCADE;
