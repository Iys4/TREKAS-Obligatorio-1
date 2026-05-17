import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usarFormularioDeLogin = ({ login }) => {
  const nav = useNavigate();
  //Cada ves que ingresas un caracter nuevo se carga ese caracter en la pagina
  const [email, actualizarEmail] = useState('');
  const [pass, actualizarContraseña] = useState('');
  const [error, actualizarError] = useState('');

  //Te avisa si la informacion no es la que tiene que ir ahi basado en el tag de email de HTML, luego se lo envia a la authorizacion en AuthService
  const erroresLogin = async () => {
    try {
      //login es la 
      await login(email, pass);
      nav('/');
    } catch (e) {
      actualizarError(e.message);
    }
  };

  //El boton que te envia a la pagina de register
  const navigateToRegister = () => nav('/register');

  //Envia todas las funciones a la parte de UI de la pagina, incluidas las funciones que importa de React
  return {
    email,
    actualizarEmail,
    pass,
    actualizarContraseña,
    error,
    erroresLogin,
    navigateToRegister,
  };
};
