import Characters from './Characters';
import Hitbox from './Hitbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useParams } from 'react-router';
import { StyledEngineProvider } from '@mui/material/styles';
import DescriptionAlerts from '@/components/ui/alert';
import Dialog from './Dialog';
import { useRoundRequest } from '../hooks/useGameAPI';
import { usePosition } from '../hooks/usePosition';
import { useAlerts } from '../hooks/useAlerts';
import { useGameByName } from '../hooks/useGameByName';

export default function Game() {
  const [roundOver, setRoundOver] = useState(false);
  const { showHitAlert, showMissAlert, showHit, showMiss } = useAlerts();
  const {
    realPosition,
    screenPosition,
    isHitboxVisible,
    updatePosition,
    toggleHitbox,
  } = usePosition();
  const { gameName } = useParams();
  const { game, isLoading, error } = useGameByName(gameName);
  const tokenRequest = useRoundRequest();

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  if (error) return <span>{error.message}</span>;
  if (!game) return <span>Game not found</span>;

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
        displayHitbox={isHitboxVisible}
        toggleHitbox={toggleHitbox}
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
