import { useState } from 'react';
import { DRIVER_PROFILE } from '../mockData';


export const useOrders = ({ cart, selectedLocation, total, clearCart }) => {
  const [ordersHistory, setOrdersHistory] = useState(DRIVER_PROFILE.history);

  // Crea un nuevo pedido con los datos actuales y lo agrega al historial
  const confirmOrder = () => {
    if (!selectedLocation || cart.length === 0) return;

    const newOrder = {
      id: `ORD-00${ordersHistory.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      total,
      status: 'EN CAMINO',
      location: selectedLocation.name,
      items: cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
      })),
    };

    // Agrega el nuevo pedido al inicio del historial
    setOrdersHistory([newOrder, ...ordersHistory]);
    // Vacia el carrito y la ubicacion seleccionada
    clearCart();
  };

  return {
    ordersHistory,
    confirmOrder,
  };
};
