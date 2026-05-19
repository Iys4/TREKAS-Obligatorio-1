import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Maneja la logica del registro, envia los datos a enviarAuth
export const usarFormularioDeRegistro = ({ register }) => {
  const nav = useNavigate();
  const [name, actualizarNombre] = useState('');
  const [email, actualizarEmail] = useState('');
  const [pass, actualizarContrasena] = useState('');
  const [passConfirm, actualizarContrasenaConfirm] = useState('');
  const [error, actualizarError] = useState('');

  const validarYRegistrar = async () => {
    actualizarError('');
    //Si el nombre es menor a 3 letras te marca error
    if (name.length <= 3) {
      actualizarError('El nombre debe tener más de 3 letras.');
      return;
    }
    //Regex hermoso para marcar que es un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      actualizarError('Por favor ingrese un email válido.');
      return;
    }
    //Contraseña muy sencilla, solo pide 8 caracteres
    if (pass.length < 8) {
      actualizarError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    // Pide que las contraseñas sean iguales
    if (pass !== passConfirm) {
      actualizarError('Las contraseñas no coinciden.');
      return;
    }
    
    try {
      await register(email, pass, name);
      nav('/');
    } catch (e) {
      actualizarError(e.message);
    }
  };

  const navigateToLogin = () => nav('/login');

  return {
    name,
    actualizarNombre,
    email,
    actualizarEmail,
    pass,
    actualizarContrasena,
    passConfirm,
    actualizarContrasenaConfirm,
    error,
    validarYRegistrar,
    navigateToLogin,
  };
};
