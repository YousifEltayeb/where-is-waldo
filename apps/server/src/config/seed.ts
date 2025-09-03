import { prisma, Difficulty } from './prismaClient';
import { supabase } from './supabaseClient.js';
import path from 'path';

async function getGamesUrls() {
  const { data } = await supabase.storage.from('images').list('games');
  const gameUrls: any = {};
  if (data) {
    data.forEach((file) => {
      const fileName = path.parse(file.name).name;

      const url = supabase.storage
        .from('images')
        .getPublicUrl(`games/${file.name}`);
      gameUrls[fileName] = url.data.publicUrl;
    });
  }
  console.log(gameUrls);

  return gameUrls;
}
async function getCharactersUrls() {
  const { data } = await supabase.storage.from('images').list('characters');
  const charUrls: any = {};
  if (data) {
    data.forEach((file) => {
      const fileName = path.parse(file.name).name;

      const url = supabase.storage
        .from('images')
        .getPublicUrl(`characters/${file.name}`);
      charUrls[fileName] = url.data.publicUrl;
    });
  }
  return charUrls;
}

async function seedGames() {
  const gamesUrls = await getGamesUrls();
  if (typeof gamesUrls === 'undefined') {
    throw new Error('no urls');
  }
  // Delete in reverse order of dependency
  await prisma.game.deleteMany();
  await prisma.character.deleteMany();
  await prisma.round.deleteMany();
  await prisma.leaderboard.deleteMany();

  await prisma.game.createMany({
    data: [
      {
        name: 'Rainforest',
        link: gamesUrls.rainforest,
        difficulty: Difficulty.MEDIUM,
      },
      {
        name: 'Cityport',
        link: gamesUrls.cityport,
        difficulty: Difficulty.HARD,
      },
      {
        name: 'Floating Island',
        link: gamesUrls.floating_island,
        difficulty: Difficulty.MEDIUM,
      },
      {
        name: 'Medieval Floating Village',
        link: gamesUrls.medieval_floating_village,
        difficulty: Difficulty.EASY,
      },
    ],
  });

  console.log('Games seeded');
}
async function seedCharacters() {
  const charUrls = await getCharactersUrls();
  console.log(charUrls);
  const floatingIsland: any = await prisma.game.findUnique({
    where: { name: 'Floating Island' },
  });
  const cityport: any = await prisma.game.findUnique({
    where: { name: 'Cityport' },
  });
  const medievalFloatingVillage: any = await prisma.game.findUnique({
    where: { name: 'Medieval Floating Village' },
  });
  const rainforst: any = await prisma.game.findUnique({
    where: { name: 'Rainforest' },
  });
  {
    await prisma.character.createMany({
      data: [
        {
          name: 'Bessie',
          link: charUrls.Bessie,
          gameId: floatingIsland.id,
          xStart: 568,
          xEnd: 830,
          yStart: 1378,
          yEnd: 1590,
        },
        {
          name: 'Crabby',
          link: charUrls.Crabby,
          gameId: cityport.id,
          xStart: 1286,
          xEnd: 1335,
          yStart: 1585,
          yEnd: 1618,
        },
        {
          name: 'Gherkin',
          link: charUrls.Gherkin,
          gameId: medievalFloatingVillage.id,
          xStart: 1407,
          xEnd: 1509,
          yStart: 2550,
          yEnd: 2728,
        },
        {
          name: 'Gnorman',
          link: charUrls.Gnorman,
          gameId: floatingIsland.id,
          xStart: 2161,
          xEnd: 2446,
          yStart: 2391,
          yEnd: 2606,
        },
        {
          name: 'Henrietta',
          link: charUrls.Henrietta,
          gameId: cityport.id,
          xStart: 1293,
          xEnd: 1330,
          yStart: 1117,
          yEnd: 1161,
        },
        {
          name: 'Maria',
          link: charUrls.Maria,
          gameId: cityport.id,
          xStart: 1958,
          xEnd: 1997,
          yStart: 724,
          yEnd: 811,
        },
        {
          name: 'Momo',
          link: charUrls.Momo,
          gameId: rainforst.id,
          xStart: 231,
          xEnd: 283,
          yStart: 899,
          yEnd: 968,
        },
        {
          name: 'Pickles',
          link: charUrls.Pickles,
          gameId: medievalFloatingVillage.id,
          xStart: 3373,
          xEnd: 3452,
          yStart: 2047,
          yEnd: 2206,
        },
        {
          name: 'Pip',
          link: charUrls.Pip,
          gameId: rainforst.id,
          xStart: 35,
          xEnd: 98,
          yStart: 757,
          yEnd: 846,
        },
        {
          name: 'Spike',
          link: charUrls.Spike,
          gameId: floatingIsland.id,
          xStart: 1096,
          xEnd: 1353,
          yStart: 2644,
          yEnd: 2794,
        },
        {
          name: 'Vinnie',
          link: charUrls.Vinnie,
          gameId: rainforst.id,
          xStart: 993,
          xEnd: 1070,
          yStart: 455,
          yEnd: 521,
        },
        {
          name: 'Wobbles',
          link: charUrls.Wobbles,
          gameId: medievalFloatingVillage.id,
          xStart: 3207,
          xEnd: 3323,
          yStart: 872,
          yEnd: 1049,
        },
      ],
    });

    console.log('Characters seeded');
  }
}

async function seedRoundsAndLeaderboard() {
  const floatingIsland: any = await prisma.game.findUnique({
    where: { name: 'Floating Island' },
  });
  const cityport: any = await prisma.game.findUnique({
    where: { name: 'Cityport' },
  });
  const medievalFloatingVillage: any = await prisma.game.findUnique({
    where: { name: 'Medieval Floating Village' },
  });
  const rainforst: any = await prisma.game.findUnique({
    where: { name: 'Rainforest' },
  });
  const rounds = await prisma.round.createManyAndReturn({
    data: [
      {
        end: new Date(),
        gameId: floatingIsland.id,
        hits: [7, 9, 11],
      },
      {
        gameId: cityport.id,
        hits: [1, 4, 10],
        end: new Date(),
      },
      {
        gameId: rainforst.id,
      },
    ],
  });

  await prisma.leaderboard.createMany({
    data: [
      { seconds: 123, playerName: null, roundId: rounds[0].id },
      { seconds: 321, playerName: 'Flan Alflany', roundId: rounds[1].id },
    ],
  });
}

// seedGames()
//   .then(() => seedCharacters())
//   .then(() => seedRoundsAndLeaderboard())
//   .catch((err) => {
//     console.error(err);
//   });
export { seedCharacters, seedGames, seedRoundsAndLeaderboard };

