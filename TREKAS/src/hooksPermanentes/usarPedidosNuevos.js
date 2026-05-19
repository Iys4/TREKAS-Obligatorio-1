// La funcion se lanza cuando inicia la app, esa informacion queda guardada en el historial, que ahora mismo no es una base de datos real sino un estado local
//Tambien tiene la funcion de agregar nuevos items al historial de ordenes cuando se pide una nueva orden y de ordenar el historial cuando se agregan nuevos pedidos.

import { useState } from 'react';
import { PERFIL_CONDUCTOR } from '../mockData';

// Toma datos de la base de datos (los productos)
// Toma los datos que le enviamos y los usa para agregar 
export const usarPedidosNuevos = ({ user, carrito, localSeleccionado, total, limpiarCarrito }) => {
  const [historialDeOrdenes, cambiarHistorialDeOrdenes] = useState(PERFIL_CONDUCTOR.history);

  // Crea un nuevo pedido con los datos actuales y lo agrega al historial
  // Esta funcion se usa en VerPedidos cuando apretas confirmar pedido, deberia cargar a la base de datos los datos que estan en la memoria de Cart y localSeleccionado
  const confirmarOrden = () => {
    if (!localSeleccionado || carrito.length === 0) return;

    const newOrder = {
      id: `ORD-00${historialDeOrdenes.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      total,
      status: 'EN CAMINO',
      location: localSeleccionado.name,
      emailConductor: user?.email || 'repartir@gmail.com',
      items: carrito.map(item => ({
        name: item.producto.name,
        cantidad: item.cantidad,
      })),
    };

    // Agrega el nuevo pedido al inicio del historial
    cambiarHistorialDeOrdenes([newOrder, ...historialDeOrdenes]);
    // Vacia el carrito y la ubicacion seleccionada
    limpiarCarrito();
  };

  return {
    historialDeOrdenes,
    confirmarOrden,
  };
};
