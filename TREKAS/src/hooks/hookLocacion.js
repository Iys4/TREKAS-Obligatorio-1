import { useState } from 'react';

// Hook que maneja el local donde se va a entregar el pedido
// Guarda la información en sessionStorage para persistir el local seleccionado
// entre transiciones de pantallas y recargas.
export const hookLocacion = () => {
  const [localSeleccionado, setLocal] = useState(() => {
    try {
      const saved = sessionStorage.getItem('localSeleccionado');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error reading localSeleccionado from sessionStorage:", e);
      return null;
    }
  });

  const establecerLocacion = (local) => {
    setLocal(local);
    try {
      if (local) {
        sessionStorage.setItem('localSeleccionado', JSON.stringify(local));
      } else {
        sessionStorage.removeItem('localSeleccionado');
      }
    } catch (e) {
      console.error("Error saving localSeleccionado to sessionStorage:", e);
    }
  };

  return {
    localSeleccionado,
    establecerLocacion,
  };
};
