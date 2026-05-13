import React, { useState } from 'react';
import { AppRouter } from './routes/AppRouter';
import { MOCK_CREDENTIALS, DRIVER_PROFILE } from './mockData';

function App() {
  // --- Auth State ---
  const [user, setUser] = useState(null);
  
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          setUser({ email, name: 'Juan Pérez' }); resolve();
        } else { reject(new Error('Credenciales inválidas')); }
      }, 500);
    });
  };
  const logout = () => setUser(null);

  // --- Cart State ---
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
    <AppRouter 
      user={user}
      login={login}
      logout={logout}
      cart={cart}
      addItem={addItem}
      removeItem={removeItem}
      clearCart={clearCart}
      total={total}
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      ordersHistory={ordersHistory}
      confirmOrder={confirmOrder}
    />
  );
}
export default App;