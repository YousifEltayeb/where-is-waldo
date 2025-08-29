import { FocusCards } from '@/components/ui/focus-cards';
export default function Home() {
  const games = [
    {
      title: 'Cityport',
      src: '../../../public/cityport.png',
      route: '/cityport',
    },
    {
      title: 'Floating Island',
      src: '../../../public/floating-island.jpeg',
      route: '/floating-island',
    },
    {
      title: 'Medieval Floating Village',
      src: '../../../public/medieval-floating-village.jpeg',
    },
    {
      title: 'Rainforest',
      src: '../../../public/rainforest.jpeg',
    },
  ];
  return (
    <main className="flex flex-col justify-center items-center ">
      <h1 className="py-5">Pick a game</h1>
      <FocusCards cards={games} />
    </main>
  );
}
