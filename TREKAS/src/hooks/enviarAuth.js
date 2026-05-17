import { useState } from 'react';
import { servicioDeLogin } from '../services/authService';

export const enviarAuth = () => {
  //UseState es la expresion que usamos cuando le queremos dar memoria a la computadora, empieza vacio
  const [user, guardarUsuario] = useState(null);
  //UserData es un array que dice Email, contraseña
  const login = async (email, contraseña) => {
    try {
      //Se fija si lo que ingresamos como userData es igual que lo que esta en nuestra "base de datos" 
      //En el futuro tenemos que cambiar esta linea
      //LoginService mira la base de datos y nos devuelve si esta correcto o no
      const userData = await servicioDeLogin(email, contraseña);
      guardarUsuario(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };
  //Si apretas el boton de logout borra el usuario de la memoria
  const logout = () => guardarUsuario(null);

  return {
    user,
    login,
    logout
  };
};
