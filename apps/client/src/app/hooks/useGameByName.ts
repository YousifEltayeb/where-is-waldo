import { useGamesQuery } from '../hooks/useGameAPI';
import { GameType } from '../types';

interface UseGameByNameReturn {
  game: GameType;
  isLoading: boolean;
  error: Error | null;
}
export const useGameByName = (
  gameName: string | undefined
): UseGameByNameReturn => {
  const gamesQuery = useGamesQuery();
  const game = gamesQuery.data?.find(
    (game: GameType) => game.name === gameName
  );
  return { isLoading: gamesQuery.isPending, game, error: gamesQuery.error };
};
