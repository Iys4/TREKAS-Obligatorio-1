import { useState } from 'react';
//En esta funcion se guardan los datos que tienen que ver con el carrito
// Hook que maneja unicamente el carrito de productos y el total
export const usarCarrito = () => {
  //guarda el carrito en un use state para que no se borre
  const [carrito, enviarNuevoCarrito] = useState([]);

  // Si el producto ya esta en el carrito actualiza su cantidad; si no, lo agrega
  const agregarItem = (producto, cantidad) => {
    enviarNuevoCarrito(prev => {
      const existing = prev.find(item => item.producto.id === producto.id);
      //"suma" el numero al array y le pone mas numeritos
      if (existing) {
        return prev.map(item =>
          item.producto.id === producto.id ? { ...item, cantidad } : item
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  // Vacia todos los productos del carrito, sirve cuando se confirma el pedido y borramos la memoria,
  //porque al ser un hook tiene memoria esta funcion
  const limpiarCarrito = () => {
    enviarNuevoCarrito([]);
  };

  // Sumamos los precios y se los mandamos al return
  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return {
    carrito,
    agregarItem,
    limpiarCarrito,
    total,
  };
};

