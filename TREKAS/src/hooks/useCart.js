import { useState } from 'react';
//En esta funcion se guardan los datos que tienen que ver con el carrito
// Hook que maneja unicamente el carrito de productos y el total
export const useCart = () => {
  //guarda el carrito en un use state para que no se borre
  const [cart, setCart] = useState([]);

  // Si el producto ya esta en el carrito actualiza su cantidad; si no, lo agrega
  const addItem = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      //"suma" el numero al array y le pone mas numeritos
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  // Vacia todos los productos del carrito, sirve cuando se confirma el pedido y borramos la memoria,
  //porque al ser un hook tiene memoria esta funcion
  const clearCart = () => {
    setCart([]);
  };

  // Sumamos los precios y se los mandamos al return
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return {
    cart,
    addItem,
    clearCart,
    total,
  };
};
