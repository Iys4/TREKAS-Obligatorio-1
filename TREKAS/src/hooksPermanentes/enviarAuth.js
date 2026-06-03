import { useState } from 'react';
import { apiFetch, saveToken, removeToken } from '../services/api';

export const enviarAuth = () => {
  //UseState con inicializador perezoso para leer de localStorage y mantener la sesión al recargar
  const [user, guardarUsuario] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const respuesta = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveToken(respuesta.token);
    localStorage.setItem("user", JSON.stringify(respuesta.user));
    guardarUsuario(respuesta.user);
    return respuesta.user;
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("user");
    guardarUsuario(null);
  };

  //Registro real que consume la API del backend
  const register = async (email, password) => {
    try {
      const respuesta = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          data: {
            nombre: null,
            horasTrabajadas: null
          }
        }),
      });
      saveToken(respuesta.token);
      localStorage.setItem("user", JSON.stringify(respuesta.user));
      guardarUsuario(respuesta.user);
      return respuesta.user;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    login,
    logout,
    register
  };
};
