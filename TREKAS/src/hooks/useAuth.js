import { useState } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  //UseState es la expresion que usamos cuando le queremos dar memoria a la computadora, empieza vacio
  const [user, setUser] = useState(null);
//UserData es un array que dice Email, password
  const login = async (email, password) => {
    try {
      //Se fija si lo que ingresamos como userData es igual que lo que esta en nuestra "base de datos" 
      //En el futuro tenemos que cambiar esta linea
      const userData = await loginService(email, password);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };
//Si apretas el boton de logout borra al usuario
  const logout = () => setUser(null);

  return {
    user,
    login,
    logout
  };
};
