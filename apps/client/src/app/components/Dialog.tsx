import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
interface Props {
  setRoundOver: React.Dispatch<React.SetStateAction<boolean>>;
  roundOver: boolean;
  seconds: number;
}
export default function Dialog({ setRoundOver, roundOver, seconds }: Props) {
  const navigate = useNavigate();
  //TODO: turn this into a custom hook
  const setPlayerNameRequest = useMutation({
    mutationFn: (playerName: string) =>
      fetch(SERVER_URL + '/leaderboard', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: new URLSearchParams({ playerName }),
      }),
    onError: (error) => console.error(error),
    onSuccess: (response) => {
      console.log(response);
    },
  });

  return (
    <AlertDialog onOpenChange={setRoundOver} open={roundOver}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Congrats! You've won this round!</AlertDialogTitle>
          <AlertDialogDescription>
            Provide your name and see where you rank on the leaderbaord
            <br />
            You've completed this round in: {seconds} seconds
          </AlertDialogDescription>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const target = event.target as typeof event.target & {
                name: { value: string };
              };
              setPlayerNameRequest.mutate(target.name.value);
              navigate('/leaderboard');
            }}
            id="playerNameForm"
          >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" className="border-white" autoFocus />
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button form="playerNameForm" type="submit">
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
