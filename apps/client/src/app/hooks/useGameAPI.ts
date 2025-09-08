import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchGames, createRound, createHit } from '../services/gameServices';

interface Coords {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
}
interface HitPropsType {
  setRoundOver: React.Dispatch<React.SetStateAction<boolean>>;
  showHit: () => void;
  showMiss: () => void;
  setHitCoordinates?: React.Dispatch<React.SetStateAction<Coords[]>>;
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

export const useHitRequest = ({
  setRoundOver,
  showHit,
  showMiss,
  setHitCoordinates,
}: HitPropsType) => {
  return useMutation({
    mutationFn: (hitObj: { charId: string; xPos: string; yPos: string }) =>
      createHit(hitObj),
    onSuccess: async (response) => {
      if (response.status !== 201) {
        showMiss();
      } else {
        const data = await response.json();
        console.log(data);

        showHit();
        try {
          // If the server returns coordinates for a successful hit, set them
          if (data.xStart && setHitCoordinates) {
            setHitCoordinates((prev) => [
              ...prev,
              {
                xStart: data.xStart,
                xEnd: data.xEnd,
                yStart: data.yStart,
                yEnd: data.yEnd,
              },
            ]);
          }

          if (data.roundOver) setRoundOver(true);
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      }
    },
    onError: (error) => console.error(error),
  });
};