import { useState } from 'react';

// Hook que maneja el local donde se va a entregar el pedido
//Recibe la informacion del menu de seleccion de local y lo guarda en la memomoria para que se use mas adelante cuando aceptes enviar el pedido.
//Usamos un hook permanente porque el usuario puede moverse para atras y para adelante entre pantallas sin perder los datos
export const hookLocacion = () => {
  const [localSeleccionado, establecerLocacion] = useState(null);

  return {
    localSeleccionado,
    establecerLocacion,
  };
};
