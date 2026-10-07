import { useState } from "react";

import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import SearchBar from "./components/SearchBar";

function App() {
  const [query, setQuery] = useState("");

  function handleSearch() {
    console.log("Pesquisa:", query);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            align="center"
            gutterBottom
          >
            Noms Food Explorer
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Pesquise alimentos e consulte suas
            informações nutricionais.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        component="main"
        sx={{
          py: 5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 4,
            },
            borderRadius: 3,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Pesquisar alimento
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Digite o nome de um alimento para consultar
            suas informações.
          </Typography>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
        </Paper>

        <Box
          component="section"
          sx={{
            mt: 5,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight={700}
            gutterBottom
          >
            Resultados
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              p: {
                xs: 3,
                sm: 5,
              },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Faça uma pesquisa para começar
            </Typography>

            <Typography color="text.secondary">
              Os alimentos encontrados serão exibidos
              aqui.
            </Typography>
          </Paper>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 3,
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            Noms Food Explorer — Projeto 1 Fullstack
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;