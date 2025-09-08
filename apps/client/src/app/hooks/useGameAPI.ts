import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchGames, createRound, createHit } from '../services/gameServices';
interface HitPropsType {
  setRoundOver: React.Dispatch<React.SetStateAction<boolean>>;
  showHit: () => void;
  showMiss: () => void;
}
export const useGamesQuery = () =>
  useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
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

export const useHitRequest = ({ setRoundOver, showHit, showMiss }: HitPropsType) => {
  return useMutation({
    mutationFn: (hitObj: { charId: string; xPos: string; yPos: string }) =>
      createHit(hitObj),
    onSuccess: async (response) => {
      if (response.status !== 201) {
        showMiss();
        try {
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      } else {
        showHit();
        try {
          const data = await response.json();
          if (data.roundOver) setRoundOver(true);
          console.log(data.roundOver);
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      }
    },
    onError: (error) => console.error(error),
  });
};
