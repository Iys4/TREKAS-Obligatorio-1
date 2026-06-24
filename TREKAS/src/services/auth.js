import { apiFetch, saveToken, removeToken } from './api';

// Envia la peticion a la API y recibe el token, guardando el token con saveToken en el localstorage
export const apiLogin = async (email, password) => {
  const respuesta = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveToken(respuesta.token);
  return respuesta.user;
};

// Registra un nuevo usuario en la API y lo loguea
export const apiRegister = async (email, password, nombre) => {
  const respuesta = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      data: {
        nombre: nombre || null,
      }
    }),
  });
  saveToken(respuesta.token);
  return respuesta.user;
};

// Actualiza el nombre del usuario en la API
export const apiUpdateUserName = async (newName) => {
  const respuesta = await apiFetch("/api/usuarios/me", {
    method: "PUT",
    body: JSON.stringify({
      nombre: newName
    })
  });
  return respuesta.user;
};

// Borra el token guardado
export const apiLogout = () => {
  removeToken();
};
