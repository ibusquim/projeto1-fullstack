import {
  Alert,
  Button,
  Stack,
} from "@mui/material";

function ErrorMessage({
  message = "Não foi possível carregar os alimentos.",
  onRetry,
}) {
  return (
    <Stack spacing={2}>
      <Alert severity="error">
        {message}
      </Alert>

      {onRetry && (
        <Button
          variant="outlined"
          onClick={onRetry}
          sx={{
            alignSelf: "flex-start",
          }}
        >
          Tentar novamente
        </Button>
      )}
    </Stack>
  );
}

export default ErrorMessage;