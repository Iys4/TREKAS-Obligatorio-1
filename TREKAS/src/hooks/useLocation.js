import { useState } from 'react';

// Hook que maneja el local donde se va a entregar el pedido
//Recibe la informacion del menu de seleccion de local y lo guarda en la memomoria para que se use mas adelante cuando aceptes enviar el pedido.
export const useLocation = () => {
  const [selectedLocation, establecerLocacion] = useState(null);

  return {
    selectedLocation,
    establecerLocacion,
  };
};
