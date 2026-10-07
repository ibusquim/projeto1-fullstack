const API_URL = "https://api.noms.sh/v1";

const API_KEY = import.meta.env.VITE_NOMS_API_KEY;

export async function searchFoods(query) {
    const params = new URLSearchParams({
        q: query,
    });

    const response = await fetch(
        `${API_URL}/foods?${params.toString()}`,
        {
            method: "GET",
            headers: {
                "X-API-Key": API_KEY,
            },
        }
    );

    console.log("Status HTTP:", response.status);

    if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    console.error("Erro retornado pela Noms:", errorBody);

    throw new Error(
        errorBody?.detail || "Não foi possível consultar a Noms API."
    );
}

    const result = await response.json();

    return result.data;
}