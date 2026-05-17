// La funcion se lanza cuando inicia la app, esa informacion queda guardada en el historial, que ahora mismo no es una base de datos real sino un estado local

import { useState } from 'react';
import { DRIVER_PROFILE } from '../mockData';

// Toma datos de la base de datos (los productos)
// Toma los datos que le enviamos cuando se llama la funcion que son cart, locacion, el total de precio y llama la funcion de eliminar el carro.
export const useOrders = ({ user, cart, selectedLocation, total, limpiarCarrito }) => {
  const [ordersHistory, setOrdersHistory] = useState(DRIVER_PROFILE.history);

  // Crea un nuevo pedido con los datos actuales y lo agrega al historial
  // Esta funcion se usa en OrderSummary cuando apretas confirmar pedido, deberia cargar a la base de datos los datos que estan en la memoria de Cart y selectedLocation
  const confirmOrder = () => {
    if (!selectedLocation || cart.length === 0) return;

    const newOrder = {
      id: `ORD-00${ordersHistory.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      total,
      status: 'EN CAMINO',
      location: selectedLocation.name,
      driverEmail: user?.email || 'repartir@gmail.com',
      items: cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
      })),
    };

    // Agrega el nuevo pedido al inicio del historial
    setOrdersHistory([newOrder, ...ordersHistory]);
    // Vacia el carrito y la ubicacion seleccionada
    limpiarCarrito();
  };

  return {
    ordersHistory,
    confirmOrder,
  };
};

