'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

export type Leaderboard = {
  playerName: string;
  seconds: number;
  gameName: string;
};

export const columns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: 'playerName',
    header: 'Player Name',
  },
  {
    accessorKey: 'seconds',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Seconds
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'Round.Game.name',
    header: 'Game Name',
  },
];
