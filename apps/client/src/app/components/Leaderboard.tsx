import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './data-table';
import { useLeaderboardQuery } from '../hooks/useGameAPI';

export default function DemoPage() {
  const leaderboard = useLeaderboardQuery();

  if (leaderboard.isPending)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  if (leaderboard.error) return <span>{leaderboard.error.message}</span>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={leaderboard.data} />
    </div>
  );
}
