import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

function ErrorMessage({
  message = "Não foi possível carregar os alimentos.",
  onRetry,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
      }}
    >
      <Stack spacing={2}>
        <Alert severity="error">
          <Typography variant="body2">
            {message}
          </Typography>
        </Alert>

        {onRetry && (
          <Button
            variant="outlined"
            onClick={onRetry}
            sx={{
              alignSelf: {
                xs: "stretch",
                sm: "flex-start",
              },
            }}
          >
            Tentar novamente
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default ErrorMessage;