import { useState } from 'react';
//Le pide funcionalidades de API a services/auth para que sea mas legible la pagina
import { apiLogin, apiRegister, apiUpdateUserName, apiLogout } from '../services/auth';

//Se definen las funciones que se usan en los procesos de iniciar sesion, registrarse y cerrar sesion.
export const enviarAuth = () => {
  //si hay un usuario y un token guardado en la app te abre la sesion en la que esta
  const [user, guardarUsuario] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Usa el servicio de autenticación para loguearse y actualiza el estado y localStorage
  const login = async (email, password) => {
    const apiUser = await apiLogin(email, password);
    localStorage.setItem("user", JSON.stringify(apiUser));
    guardarUsuario(apiUser);
    return apiUser;
  };

  // Cierra sesión en el servicio, limpia el localStorage y pone el usuario en nulo
  const logout = () => {
    apiLogout();
    localStorage.removeItem("user");
    guardarUsuario(null);
  };

  // Registra un nuevo usuario mediante el servicio e inicia su sesión
  const register = async (email, password, nombre) => {
    try {
      const apiUser = await apiRegister(email, password, nombre);
      localStorage.setItem("user", JSON.stringify(apiUser));
      guardarUsuario(apiUser);
      return apiUser;
    } catch (error) {
      throw error;
    }
  };

  // Actualiza el nombre del usuario
  const updateUserName = async (nuevoNombre) => {
    if (user) {
      try {
        const apiUser = await apiUpdateUserName(nuevoNombre);
        
        // La API devuelve el usuario actualizado o usamos fallback local
        const updatedUser = apiUser || {
          ...user,
          data: {
            ...user.data,
            nombre: nuevoNombre
          }
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        guardarUsuario(updatedUser);
      } catch (error) {
        console.error("Error al actualizar el nombre en la API:", error);
        throw error;
      }
    }
  };

  return {
    user,
    login,
    logout,
    register,
    updateUserName
  };
};
