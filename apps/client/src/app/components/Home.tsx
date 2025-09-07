import { FocusCards } from '@/components/ui/focus-cards';
import { useQuery } from '@tanstack/react-query';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Home() {
  const gamesQuery = useQuery({
    queryKey: ['games'],
    queryFn: () =>
      fetch(SERVER_URL + '/games', {
        method: 'GET',
        mode: 'cors',
      }).then((res) => res.json()),
  });

  if (gamesQuery.isPending) return 'Loading...';
  if (gamesQuery.error) return 'Error';

  return (
    <main className="flex flex-col justify-center items-center ">
      <h1 className="py-5">Pick a game</h1>
      <FocusCards cards={gamesQuery.data} />
    </main>
  );
}
