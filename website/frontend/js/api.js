const API_URL = "http://localhost:3000";

async function apiRequest(endpoint, options = {}) {
    const token = obterToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",

            ...(token
                ? {
                    Authorization: `Bearer ${token}`
                }
                : {}),

            ...(options.headers || {})
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar requisição");
    }

    return data;
}