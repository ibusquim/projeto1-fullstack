import {
  Button,
  Stack,
  TextField,
} from "@mui/material";

function SearchBar({
  value,
  onChange,
  onSearch,
  loading = false,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!value.trim() || loading) {
      return;
    }

    onSearch();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          label="Alimento"
          placeholder="Digite o nome de um alimento"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!value.trim() || loading}
          sx={{
            minWidth: { xs: "100%", sm: 140 },
          }}
        >
          {loading ? "Pesquisando..." : "Pesquisar"}
        </Button>
      </Stack>
    </form>
  );
}

export default SearchBar;