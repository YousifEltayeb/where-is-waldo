'use client';
import { useNavigate } from 'react-router-dom';
import Characters from './Characters';
import Hitbox from './Hitbox';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { StyledEngineProvider } from '@mui/material/styles';
import Alert from '@/components/ui/alert';
import Dialog from './Dialog';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function Game() {
  const [realXPos, setRealXPos] = useState(0);
  const [realYPos, setRealYPos] = useState(0);
  const [onScreenXPos, setOnScreenXPos] = useState(0);
  const [onScreenYPos, setOnScreenYPos] = useState(0);
  const [displayBox, setDisplayBox] = useState('none');
  const [showHitAlert, setShowHitAlert] = useState('none');
  const [showMissAlert, setShowMissAlert] = useState('none');
  const [roundOver, setRoundOver] = useState(false);
  const navigate = useNavigate();

  const { gameName } = useParams();

  const gamesQuery = useQuery({
    queryKey: ['games'],
    queryFn: () =>
      fetch(SERVER_URL + '/games', {
        method: 'GET',
        mode: 'cors',
      }).then((res) => res.json()),
  });
  useEffect(() => {
    if (showHitAlert === 'block') {
      const toRef = setTimeout(() => {
        setShowHitAlert('none');
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showHitAlert]);

  useEffect(() => {
    if (showMissAlert === 'block') {
      const toRef = setTimeout(() => {
        setShowMissAlert('none');
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showMissAlert]);
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
    onError: (error) => console.error(error),
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

  return (
    <main>
      <StyledEngineProvider injectFirst>
        <Alert showMissAlert={showMissAlert} showHitAlert={showHitAlert} />
      </StyledEngineProvider>
      <Dialog setRoundOver={setRoundOver} roundOver={roundOver} />
      <h1>Find these characters</h1>
      <Characters characters={game.Characters} />
      <div className="w-full relative">
        <img
          className="absolute cursor-crosshair"
          src={game.link}
          alt=""
          onClick={mark}
          onLoad={() => getToken()}
        />
      </div>
      <Hitbox
        characters={game.Characters}
        display={displayBox}
        xPos={onScreenXPos}
        yPos={onScreenYPos}
        realXPos={realXPos}
        realYPos={realYPos}
        setShowHitAlert={setShowHitAlert}
        setShowMissAlert={setShowMissAlert}
        setRoundOver={setRoundOver}
      />
    </main>
  );
}
