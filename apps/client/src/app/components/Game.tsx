import Characters from './Characters';
import Hitbox from './Hitbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useParams } from 'react-router';
import { StyledEngineProvider } from '@mui/material/styles';
import DescriptionAlerts from '@/components/ui/alert';
import Dialog from './Dialog';
import { GameType } from '../types';
import { useGamesQuery, useRoundRequest } from '../hooks/useGameAPI';
import { usePosition } from '../hooks/usePosition';
import { useAlerts } from '../hooks/useAlerts';

export default function Game() {
  const [roundOver, setRoundOver] = useState(false);

  const {
    realPosition,
    screenPosition,
    isHitboxVisible,
    updatePosition,
    toggleHitbox,
  } = usePosition();

  const { showHitAlert, showMissAlert, showHit, showMiss } = useAlerts();

  const { gameName } = useParams();

  const gamesQuery = useGamesQuery();
  const tokenRequest = useRoundRequest();

  if (gamesQuery.isPending)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  if (gamesQuery.error) return <span>{gamesQuery.error.message}</span>;

  const game = gamesQuery.data.find((game: GameType) => game.name === gameName);
  const getToken = () => {
    tokenRequest.mutate(game.id);
  };
  const mark = (e: React.MouseEvent<HTMLImageElement>) => {
    updatePosition(e, game.imgWidth);
    toggleHitbox();
  };

  return (
    <main>
      <StyledEngineProvider injectFirst>
        <DescriptionAlerts
          showHitAlert={showHitAlert}
          showMissAlert={showMissAlert}
        />
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
        display={isHitboxVisible}
        xPos={screenPosition.x}
        yPos={screenPosition.y}
        realXPos={realPosition.x}
        realYPos={realPosition.y}
        setRoundOver={setRoundOver}
        showHit={showHit}
        showMiss={showMiss}
      />
    </main>
  );
}
