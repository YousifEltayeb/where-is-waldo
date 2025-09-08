import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface AlertProps {
  showHitAlert: boolean;
  showMissAlert: boolean;
}

export default function DescriptionAlerts({ showHitAlert, showMissAlert }: AlertProps) {
  return (
    <Stack
      sx={{
        width: '25%',
        position: 'fixed',
        top: '50%',
        left: '40%',
        zIndex: 99,
      }}
      spacing={2}
    >
      <Alert severity="success" sx={{ display: showHitAlert ? 'block' : 'none' }}>
        <AlertTitle>Success</AlertTitle>
        Nice Shot!
      </Alert>
      <Alert severity="error" sx={{ display: showMissAlert ? 'block' : 'none' }}>
        <AlertTitle>You Missed</AlertTitle>
        Try Again!
      </Alert>
    </Stack>
  );
}