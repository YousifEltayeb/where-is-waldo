import { useQuery, useMutation } from '@tanstack/react-query';

import {
  fetchGames,
  createRound,
  createHit,
  fetchLeaderboard,
} from '../services/gameServices';

export const useGamesQuery = () =>
  useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

export const useLeaderboardQuery = () =>
  useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  });
export const useRoundRequest = () =>
  useMutation({
    mutationFn: (gameId: string) => createRound(gameId),

    onSuccess: (data) => {
      console.log(data);

      localStorage.setItem('token', data);
    },
    onError: (error) => console.error(error),
  });
export const useHitRequest = () => {
  return useMutation({
    mutationFn: (hitObj: { charId: string; xPos: string; yPos: string }) =>
      createHit(hitObj),
    onError: (error) => console.error(error),
  });
};

