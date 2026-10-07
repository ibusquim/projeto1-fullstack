import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 220,
        gap: 2,
      }}
    >
      <CircularProgress />

      <Typography color="text.secondary">
        Buscando alimentos...
      </Typography>
    </Box>
  );
}

export default Loading;