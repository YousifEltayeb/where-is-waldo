import { Char } from '../types';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Props {
  characters: Char[];
  display: string;
  xPos: number;
  yPos: number;
  realXPos: number;
  realYPos: number;
  setShowHitAlert: React.Dispatch<React.SetStateAction<string>>;
  setShowMissAlert: React.Dispatch<React.SetStateAction<string>>;
  setRoundOver: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Hitbox({
  characters,
  display,
  xPos,
  yPos,
  realXPos,
  realYPos,
  setShowHitAlert,
  setShowMissAlert,
  setRoundOver,
}: Props) {
  const hitRequest = useMutation({
    mutationFn: (hitObj: { charId: string; xPos: string; yPos: string }) => {
      console.log(localStorage.getItem('token'));

      return fetch(SERVER_URL + '/rounds', {
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
      });
    },
    onSuccess: (response) => {
      if (response.status !== 201) {
        setShowMissAlert('block');
        console.log(response.json());
      } else {
        response.json().then((data) => {
          if (data.roundOver) setRoundOver(true);
          console.log(data.roundOver);
        });
        setShowHitAlert('block');
      }
    },
    onError: (error) => console.error(error),
  });
  const hit = (charId: string) => {
    hitRequest.mutate({
      charId,
      xPos: String(realXPos),
      yPos: String(realYPos),
    });
  };
  return (
    <div style={{ display: display }}>
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
