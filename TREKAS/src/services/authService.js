import { MOCK_CREDENTIALS, PERFIL_CONDUCTOR } from '../mockData';

//Se fija si el email y contraseña se alinean con lo que hay en nuestra "base de datos"

export const servicioDeLogin = (email, contraseña) => {
  return new Promise((resolve, reject) => {
    if (email === MOCK_CREDENTIALS.email && contraseña === MOCK_CREDENTIALS.contraseña) {
      resolve({ email, name: PERFIL_CONDUCTOR.name });
    } else {
      reject(new Error('Credenciales inválidas'));
    }
  });
};
