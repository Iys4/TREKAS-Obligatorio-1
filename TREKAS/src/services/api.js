// =====================================================
// Archivo central para consumir la API del obligatorio.
// =====================================================

// CAMBIAR ESTA URL por la URL real de Render cuando esté publicada.
export const API_URL = "https://creacionaplicaciones.onrender.com";

// Project Key
export const PROJECT_KEY = "trekas-app";

export const getToken = () => localStorage.getItem("token");
export const saveToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

// Función genérica para hacer fetch a la API.
// Ya agrega siempre:
// - Content-Type
// - x-project-key
// - Authorization si hay token
export const apiFetch = async (path, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    "x-project-key": PROJECT_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  // If the response is not OK, log details and handle unauthorized token
if (!response.ok) {
  // Clear token on 401 to force re‑login
  if (response.status === 401) {
    removeToken();
  }
  // Log status and any error message returned by the API for debugging
  console.error('API error', response.status, data?.error || text);
  throw new Error(data?.error || "Error consumiendo la API");
}

  return data;
};
