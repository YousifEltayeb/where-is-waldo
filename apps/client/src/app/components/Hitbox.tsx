import { Char } from '../types';
import { Button } from '@/components/ui/button';
import { useHitRequest } from '../hooks/useGameAPI';

interface Props {
  characters: Char[];
  displayHitbox: boolean;
  toggleHitbox: () => void;
  xPos: number;
  yPos: number;
  realXPos: number;
  realYPos: number;
  setRoundOver: React.Dispatch<React.SetStateAction<boolean>>;
  showHit: () => void;
  showMiss: () => void;
}
export default function Hitbox({
  characters,
  displayHitbox,
  toggleHitbox,
  xPos,
  yPos,
  realXPos,
  realYPos,
  setRoundOver,
  showHit,
  showMiss,
}: Props) {
  const hitRequest = useHitRequest({
    setRoundOver,
    showHit,
    showMiss,
  });

  const hit = (charId: string) => {
    hitRequest.mutate({
      charId,
      xPos: String(realXPos),
      yPos: String(realYPos),
    });
    toggleHitbox();
  };
  return (
    <div style={{ display: displayHitbox ? 'block' : 'none' }}>
      <div
        style={{
          top: yPos - 20 + 'px',
          left: xPos - 20 + 'px',
        }}
        className="absolute w-10 h-10 border-4 border-solid border-red-500"
      />
      <div
        style={{
          top: yPos - 20 + 'px',
          left: xPos + 20 + 'px',
        }}
        className="absolute  h-30 ml-5 "
      >
        <ul className="flex flex-col gap-3">
          <Button onClick={() => hit(characters[0].id)}>
            {characters[0].name}
          </Button>
          <Button onClick={() => hit(characters[1].id)}>
            {characters[1].name}
          </Button>
          <Button onClick={() => hit(characters[2].id)}>
            {characters[2].name}
          </Button>
        </ul>
      </div>
    </div>
  );
}
