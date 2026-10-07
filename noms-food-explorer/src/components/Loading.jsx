import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress />

      <Typography
        variant="body1"
        color="text.secondary"
      >
        Buscando alimentos...
      </Typography>
    </Box>
  );
}

export default Loading;