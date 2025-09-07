'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const queryClient = new QueryClient();
export default function Game() {
  const [realXPos, setRealXPos] = useState(0);
  const [realYPos, setRealYPos] = useState(0);
  const [onScreenXPos, setOnScreenXPos] = useState(0);
  const [onScreenYPos, setOnScreenYPos] = useState(0);
  const [displayBox, setDisplayBox] = useState('none');

  const { gameName } = useParams();

  const gamesQuery = useQuery({
    queryKey: ['games'],
    queryFn: () =>
      fetch(SERVER_URL + '/games', {
        method: 'GET',
        mode: 'cors',
      }).then((res) => res.json()),
  });

  const hitRequest = useMutation({
    mutationFn: (hitObj: { charId: string; xPos: string; yPos: string }) =>
      fetch(SERVER_URL + '/rounds', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: new URLSearchParams({
          characterId: hitObj.charId,
          xCoordinate: hitObj.xPos,
          yCoordinate: hitObj.yPos,
        }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.error(error),
  });
  const tokenRequest = useMutation({
    mutationFn: (gameId: string) =>
      fetch(SERVER_URL + '/rounds', {
        method: 'POST',
        mode: 'cors',
        body: new URLSearchParams({ gameId }),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      localStorage.setItem('token', data);
    },
  });

  if (gamesQuery.isPending) return 'Loading...';
  if (gamesQuery.error) return 'Error';

  const game = gamesQuery.data.find((game: any) => game.name === gameName);
  const getToken = () => {
    tokenRequest.mutate(game.id);
  };
  const mark = (e: any) => {
    const normalizedXPos = Math.round(
      (e.nativeEvent.offsetX / e.target.width) * game.imgWidth
    );
    const normalizedYPos = Math.round(
      (e.nativeEvent.offsetY / e.target.width) * game.imgWidth
    );

    setOnScreenXPos(e.pageX);
    setOnScreenYPos(e.pageY);

    setRealXPos(normalizedXPos);
    setRealYPos(normalizedYPos);

    setDisplayBox(displayBox === 'none' ? 'block' : 'none');
  };

  const hit = (charId: string) => {
    hitRequest.mutate({
      charId,
      xPos: String(realXPos),
      yPos: String(realYPos),
    });
  };
  return (
    <main>
      <h1>Find these characters</h1>
      <div className="flex justify-center m-5">
        <ul className="flex gap-5">
          <li>
            <span>{game.Characters[0].name}</span>
            <img src={game.Characters[0].link} alt="" className="w-20" />
          </li>
          <li>
            <span>{game.Characters[1].name}</span>
            <img src={game.Characters[1].link} alt="" className="w-20" />
          </li>

          <li>
            <span>{game.Characters[2].name}</span>
            <img src={game.Characters[2].link} alt="" className="w-20" />
          </li>
        </ul>
      </div>
      <div className="w-full relative">
        <img
          className="absolute cursor-crosshair"
          src={game.link}
          alt=""
          onClick={mark}
          onLoad={() => getToken()}
        />
      </div>
      <div style={{ display: displayBox }}>
        <div
          style={{
            top: onScreenYPos - 20 + 'px',
            left: onScreenXPos - 20 + 'px',
          }}
          className="absolute w-10 h-10 border-4 border-solid border-red-500"
        />
        <div
          style={{
            top: onScreenYPos - 20 + 'px',
            left: onScreenXPos + 20 + 'px',
          }}
          className="absolute  h-30 ml-5 "
        >
          <ul className="flex flex-col gap-3">
            <Button onClick={() => hit(game.Characters[0].id)}>
              {game.Characters[0].name}
            </Button>
            <Button onClick={() => hit(game.Characters[1].id)}>
              {game.Characters[1].name}
            </Button>
            <Button onClick={() => hit(game.Characters[2].id)}>
              {game.Characters[2].name}
            </Button>
          </ul>
        </div>
      </div>
    </main>
  );
}
