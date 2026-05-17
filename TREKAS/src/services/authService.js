import { MOCK_CREDENTIALS } from '../mockData';

//Se fija si el email y contraseña se alinean con lo que hay en nuestra "base de datos"

export const loginService = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      resolve({ email, name: 'Juan Pérez' });
    } else {
      reject(new Error('Credenciales inválidas'));
    }
  });
};
