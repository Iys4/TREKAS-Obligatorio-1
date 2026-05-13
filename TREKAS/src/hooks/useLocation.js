import { useState } from 'react';

// Hook que maneja el local donde se va a entregar el pedido
export const useLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return {
    selectedLocation,
    setSelectedLocation,
  };
};
