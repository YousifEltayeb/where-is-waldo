import { prisma, Difficulty } from './prismaClient.ts';
import { supabase } from './supabaseClient.ts';
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
  await prisma.game.deleteMany();
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
  await prisma.character.deleteMany();
  {
    await prisma.character.createMany({
      data: [
        {
          name: 'Bessie',
          link: charUrls.Bessie,
          gameId: floatingIsland.id,
        },
        {
          name: 'Crabby',
          link: charUrls.Crabby,
          gameId: cityport.id,
        },
        {
          name: 'Gherkin',
          link: charUrls.Gherkin,
          gameId: medievalFloatingVillage.id,
        },
        {
          name: 'Gnorman',
          link: charUrls.Gnorman,
          gameId: floatingIsland.id,
        },
        {
          name: 'Henrietta',
          link: charUrls.Henrietta,
          gameId: cityport.id,
        },
        {
          name: 'Maria',
          link: charUrls.Maria,
          gameId: cityport.id,
        },
        {
          name: 'Momo',
          link: charUrls.Momo,
          gameId: rainforst.id,
        },
        {
          name: 'Pickles',
          link: charUrls.Pickles,
          gameId: medievalFloatingVillage.id,
        },
        {
          name: 'Pip',
          link: charUrls.Pip,
          gameId: rainforst.id,
        },
        {
          name: 'Spike',
          link: charUrls.Spike,
          gameId: floatingIsland.id,
        },
        {
          name: 'Vinnie',
          link: charUrls.Vinnie,
          gameId: rainforst.id,
        },
        {
          name: 'Wobbles',
          link: charUrls.Wobbles,
          gameId: medievalFloatingVillage.id,
        },
      ],
    });

    console.log('Characters seeded');
  }
}

seedGames()
  .then(() => seedCharacters())
  .catch((err) => {
    console.error(err);
  });
