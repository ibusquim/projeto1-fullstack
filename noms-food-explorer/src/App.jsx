import { useState } from "react";
import { searchFoods } from "./services/nomsApi";

function App() {
    // Estados principais da aplicação
    const [query, setQuery] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);

    // Indica se o usuário já realizou pelo menos uma pesquisa
    const [hasSearched, setHasSearched] = useState(false);

    async function handleSearch() {
        if (!query.trim()) {
            setFoods([]);
            setError("Digite um alimento para pesquisar.");
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
            {!loading && error === null && foods.length > 0 && (
                <div>
                    <p>
                        Alimentos encontrados: {foods.length}
                    </p>

                    {foods.map((food) => (
                        <div key={food.id}>
                            <p>{food.name}</p>

                            <button
                                onClick={() => setSelectedFood(food)}
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
                    <p>{selectedFood.name}</p>
                    <p>ID: {selectedFood.id}</p>
                </div>
            )}
        </div>
    );
}

export default App;