import { useMemo, useState } from "react";
import { searchFoods } from "./services/nomsApi";

function App() {
  // Estados principais da aplicação
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Processamento dos dados retornados pela Noms
  const processedFoods = useMemo(() => {
    return foods.map((food) => {
      const defaultServing = food.serving_sizes?.find(
        (serving) => serving.is_default === true
      );

      const firstImage = food.images?.[0];

      return {
        id: food.id,
        name: food.name?.trim() || "Alimento sem nome",

        brand: food.brand?.name?.trim() || "Marca não informada",

        nutrients: food.nutrients ?? [],

        serving: defaultServing ?? null,

        imageUrl: firstImage?.url ?? null,

        barcode: food.barcode ?? null,

        basisUnit: food.basis_unit ?? null,

        description: food.description?.trim() || null,
      };
    });
  }, [foods]);

  function handleSelectFood(food) {
    setSelectedFood(food);
  }

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const showNoResults =
    hasSearched &&
    foods.length === 0 &&
    !loading &&
    error === null;

  return (
    <div>
      <h1>Noms Food Explorer</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Digite um alimento"
        />

        <button onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <hr />

      {/* Estado inicial */}
      {!hasSearched && !loading && error === null && (
        <p>Pesquise um alimento para começar.</p>
      )}

      {/* Loading */}
      {loading && (
        <p>Carregando...</p>
      )}

      {/* Erro */}
      {error && (
        <p>{error}</p>
      )}

      {/* Nenhum resultado */}
      {showNoResults && (
        <p>Nenhum alimento encontrado.</p>
      )}

      {/* Resultados */}
      {!loading && error === null && processedFoods.length > 0 && (
        <div>
          <p>
            Alimentos encontrados: {processedFoods.length}
          </p>

          {processedFoods.map((food) => (
            <div key={food.id}>
              <h2>{food.name}</h2>

              <p>
                Marca: {food.brand}
              </p>

              <p>
                Código de barras:{" "}
                {food.barcode || "Não informado"}
              </p>

              <p>
                Unidade base:{" "}
                {food.basisUnit || "Não informada"}
              </p>

              <p>
                Nutrientes encontrados:{" "}
                {food.nutrients.length}
              </p>

              {food.serving && (
                <p>
                  Porção padrão:{" "}
                  {food.serving.quantity}{" "}
                  {food.serving.unit}
                </p>
              )}

              {food.imageUrl && (
                <p>
                  Imagem encontrada: sim
                </p>
              )}

              <button
                onClick={() => handleSelectFood(food)}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Alimento selecionado */}
      {selectedFood && (
        <div>
          <hr />

          <h2>Alimento selecionado</h2>

          <p>
            Nome: {selectedFood.name}
          </p>

          <p>
            Marca: {selectedFood.brand}
          </p>

          <p>
            ID: {selectedFood.id}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;