import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface Props {
  showHitAlert: string;
  showMissAlert: string;
}
export default function DescriptionAlerts({
  showHitAlert,
  showMissAlert,
}: Props) {
  return (
    <Stack
      sx={{
        width: '25%',
        position: 'fixed',
        top: '50%',
        left: '40%',
        zIndex: 99,
      }}
    >
      <Alert severity="success" sx={{ display: showHitAlert }}>
        <AlertTitle>Success</AlertTitle>
        Nice Shot!
      </Alert>
      <Alert severity="error" sx={{ display: showMissAlert }}>
        <AlertTitle>You Missed</AlertTitle>
        Try Again!{' '}
      </Alert>
    </Stack>
  );
}
