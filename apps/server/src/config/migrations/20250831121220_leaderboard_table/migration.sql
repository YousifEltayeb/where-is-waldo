-- CreateTable
CREATE TABLE "public"."leaderboard" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."leaderboard" ADD CONSTRAINT "leaderboard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
