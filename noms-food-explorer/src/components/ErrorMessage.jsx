import {
  Alert,
  Box,
  Typography,
} from "@mui/material";

function ErrorMessage({
  message = "Não foi possível carregar os alimentos.",
}) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
      }}
    >
      <Alert severity="error">
        <Typography variant="body2">
          {message}
        </Typography>
      </Alert>
    </Box>
  );
}

export default ErrorMessage;