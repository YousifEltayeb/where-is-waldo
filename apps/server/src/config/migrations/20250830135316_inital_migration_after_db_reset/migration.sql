-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "public"."games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'EASY',

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "gameId" INTEGER,
    "xStart" INTEGER NOT NULL,
    "xEnd" INTEGER NOT NULL,
    "yStart" INTEGER NOT NULL,
    "yEnd" INTEGER NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rounds" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3),
    "gameId" INTEGER NOT NULL,
    "hits" INTEGER[],
    "playerName" TEXT,

    CONSTRAINT "rounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "public"."games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "games_link_key" ON "public"."games"("link");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "public"."characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "characters_link_key" ON "public"."characters"("link");

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rounds" ADD CONSTRAINT "rounds_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
