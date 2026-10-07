import { useState } from "react";

import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import SearchBar from "./components/SearchBar";
import FoodCard from "./components/FoodCard";

const mockFoods = [
  {
  id: "1",
  name: "Banana",
  brandName: null,
  calories: null,
  protein: null,
  carbohydrates: null,
  fat: null,
  fiber: null,
  servingSize: "100",
  servingUnit: "g",
  imageUrl: null,
},
  {
    id: "2",
    name: "Apple",
    brandName: null,
    calories: "52",
    protein: "0.26",
    carbohydrates: "13.81",
    fat: "0.17",
    fiber: "2.4",
    servingSize: "100",
    servingUnit: "g",
    imageUrl: null,
  },
  {
    id: "3",
    name: "Peanut Butter",
    brandName: "Example Brand",
    calories: "588",
    protein: "25.1",
    carbohydrates: "20",
    fat: "50",
    fiber: "6",
    servingSize: "100",
    servingUnit: "g",
    imageUrl: null,
  },
];

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

          <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    },
    gap: 3,
  }}
>
  {mockFoods.map((food) => (
    <FoodCard
      key={food.id}
      food={food}
      onSelect={(selectedFood) => {
        console.log("Alimento selecionado:", selectedFood);
      }}
    />
  ))}
</Box>
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