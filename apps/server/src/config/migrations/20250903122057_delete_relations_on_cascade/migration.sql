-- DropForeignKey
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."leaderboard" DROP CONSTRAINT "leaderboard_roundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."rounds" DROP CONSTRAINT "rounds_gameId_fkey";

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rounds" ADD CONSTRAINT "rounds_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."leaderboard" ADD CONSTRAINT "leaderboard_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
