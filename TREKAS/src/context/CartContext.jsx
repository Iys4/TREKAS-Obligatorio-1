import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const addItem = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity } : item);
      return [...prev, { product, quantity }];
    });
  };
  const removeItem = (productId) => setCart(prev => prev.filter(item => item.product.id !== productId));
  const clearCart = () => { setCart([]); setSelectedLocation(null); };
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total, selectedLocation, setSelectedLocation }}>
      {children}
    </CartContext.Provider>
  );
};