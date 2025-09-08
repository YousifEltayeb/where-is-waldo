import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './data-table';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function DemoPage() {
  const leaderboard = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () =>
      fetch(SERVER_URL + '/leaderboard', {
        method: 'GET',
        mode: 'cors',
      }).then((res) => res.json()),
  });

  if (leaderboard.isPending)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  if (leaderboard.error) return <span>{leaderboard.error.message}</span>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={leaderboard.data} />
    </div>
  );
}
