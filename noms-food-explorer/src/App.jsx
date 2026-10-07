import { useMemo, useState } from "react";

import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import { searchFoods } from "./services/nomsApi";

import SearchBar from "./components/SearchBar";
import FoodCard from "./components/FoodCard";
import FoodDetails from "./components/FoodDetails";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  // ==========================================
  // ESTADOS PRINCIPAIS DA APLICAÇÃO
  // ==========================================

  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // ==========================================
  // PROCESSAMENTO DOS DADOS DA NOMS
  // ==========================================

  const processedFoods = useMemo(() => {
    return foods.map((food) => {
      const defaultServing = food.serving_sizes?.find(
        (serving) => serving.is_default === true
      );

      const firstImage = food.images?.[0];

      return {
        id: food.id,
        name:
          food.name?.trim() || "Alimento sem nome",

        brand:
          food.brand?.name?.trim() ||
          "Marca não informada",

        nutrients: food.nutrients ?? [],

        serving: defaultServing ?? null,

        imageUrl: firstImage?.url ?? null,

        barcode: food.barcode ?? null,

        basisUnit: food.basis_unit ?? null,

        description:
          food.description?.trim() || null,
      };
    });
  }, [foods]);

  // ==========================================
  // SELEÇÃO DO ALIMENTO
  // ==========================================

  function handleSelectFood(food) {
    setSelectedFood(food);
  }

  function handleCloseDetails() {
    setSelectedFood(null);
  }

  // ==========================================
  // PESQUISA
  // ==========================================

  async function handleSearch() {
    if (!query.trim()) {
      setFoods([]);
      setError("Digite um alimento para pesquisar.");
      setSelectedFood(null);
      setHasSearched(false);

      return;
    }

    setLoading(true);
    setError(null);
    setFoods([]);
    setSelectedFood(null);
    setHasSearched(true);

    try {
      const results = await searchFoods(query.trim());

      setFoods(results);
    } catch (err) {
      setError(
        err?.message ||
          "Não foi possível consultar os alimentos."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // ESTADO: NENHUM RESULTADO
  // ==========================================

  const showNoResults =
    hasSearched &&
    !loading &&
    error === null &&
    processedFoods.length === 0;

  // ==========================================
  // INTERFACE
  // ==========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* ======================================
          CABEÇALHO
          ====================================== */}

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
            py: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
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

      {/* ======================================
          CONTEÚDO PRINCIPAL
          ====================================== */}

      <Container
        maxWidth="lg"
        component="main"
        sx={{
          py: {
            xs: 3,
            sm: 5,
          },
        }}
      >
        {/* ====================================
            ÁREA DE PESQUISA
            ==================================== */}

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
            component="h2"
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
            loading={loading}
          />
        </Paper>

        {/* ====================================
            RESULTADOS
            ==================================== */}

        <Box
          component="section"
          sx={{
            mt: {
              xs: 4,
              sm: 5,
            },
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

          {/* ==================================
              ESTADO INICIAL
              ================================== */}

          {!hasSearched &&
            !loading &&
            error === null && (
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
                  Pesquise um alimento para começar
                </Typography>

                <Typography color="text.secondary">
                  Os alimentos encontrados serão exibidos
                  aqui.
                </Typography>
              </Paper>
            )}

          {/* ==================================
              LOADING
              ================================== */}

          {loading && <Loading />}

          {/* ==================================
              ERRO
              ================================== */}

          {!loading && error && (
            <ErrorMessage message={error} />
          )}

          {/* ==================================
              NENHUM RESULTADO
              ================================== */}

          {showNoResults && (
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
                Nenhum alimento encontrado.
              </Typography>

              <Typography color="text.secondary">
                Tente realizar outra pesquisa.
              </Typography>
            </Paper>
          )}

          {/* ==================================
              RESULTADOS REAIS
              ================================== */}

          {!loading &&
            error === null &&
            processedFoods.length > 0 && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                  }}
                >
                  Alimentos encontrados:{" "}
                  {processedFoods.length}
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
                  }}
                >
                  {processedFoods.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      onSelect={handleSelectFood}
                    />
                  ))}
                </Box>
              </>
            )}
        </Box>
      </Container>

      {/* ======================================
          DIALOG DE DETALHES
          ====================================== */}

      <FoodDetails
        open={Boolean(selectedFood)}
        food={selectedFood}
        onClose={handleCloseDetails}
      />

      {/* ======================================
          RODAPÉ
          ====================================== */}

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