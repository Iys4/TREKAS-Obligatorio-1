import React, { createContext, useState } from 'react';
import { DRIVER_PROFILE } from '../mockData';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ordersHistory, setOrdersHistory] = useState(DRIVER_PROFILE.history);

  const addItem = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity } : item);
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId) => setCart(prev => prev.filter(item => item.product.id !== productId));
  
  const clearCart = () => {
    setCart([]);
    setSelectedLocation(null);
  };

  const confirmOrder = () => {
    if (!selectedLocation || cart.length === 0) return;

    const newOrder = {
      id: `ORD-00${ordersHistory.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      total: cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
      status: 'EN CAMINO',
      location: selectedLocation.name,
      items: cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity
      }))
    };

    setOrdersHistory([newOrder, ...ordersHistory]);
    clearCart();
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      removeItem, 
      clearCart, 
      total, 
      selectedLocation, 
      setSelectedLocation,
      ordersHistory,
      confirmOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};