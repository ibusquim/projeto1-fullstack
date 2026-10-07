import { useState } from "react";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import SearchBar from "./components/SearchBar";
import FoodCard from "./components/FoodCard";
import FoodDetails from "./components/FoodDetails";

const mockFoods = [
  {
    id: "1",
    name: "Banana",
    brandName: null,
    calories: "89",
    protein: "1.09",
    carbohydrates: "22.84",
    fat: "0.33",
    fiber: "2.6",
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
];

function App() {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
        <Box
          component="header"
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            gutterBottom
          >
            Noms Food Explorer
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Pesquise alimentos e consulte suas
            informações nutricionais.
          </Typography>
        </Box>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => {
            console.log("Pesquisar:", query);
          }}
        />

        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Resultados
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              mt: 2,
            }}
          >
            {mockFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onSelect={setSelectedFood}
              />
            ))}
          </Box>
        </Box>

        <FoodDetails
          open={Boolean(selectedFood)}
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      </Container>
    </Box>
  );
}

export default App;