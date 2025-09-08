import Characters from './Characters';
import Hitbox from './Hitbox';
import MarkHit from './MarkHit';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useRef } from 'react';
import { useParams } from 'react-router';
import { StyledEngineProvider } from '@mui/material/styles';
import DescriptionAlerts from '@/components/ui/alert';
import Dialog from './Dialog';
import { useRoundRequest } from '../hooks/useGameAPI';
import { usePosition } from '../hooks/usePosition';
import { useAlerts } from '../hooks/useAlerts';
import { useGameByName } from '../hooks/useGameByName';

interface Coords {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
}

export default function Game() {
  const [roundOver, setRoundOver] = useState(false);
  const [hitCoordinates, setHitCoordinates] = useState<Coords[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
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
          ref={imageRef}
          className="absolute cursor-crosshair"
          src={game.link}
          alt=""
          onClick={mark}
          onLoad={() => getToken()}
        />
        {hitCoordinates.map((coords, index) => (
          <MarkHit
            key={index}
            xStart={coords.xStart}
            xEnd={coords.xEnd}
            yStart={coords.yStart}
            yEnd={coords.yEnd}
            imageRef={imageRef}
            originalImageWidth={game.imgWidth}
          />
        ))}
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
        setHitCoordinates={setHitCoordinates}
      />
    </main>
  );
}

