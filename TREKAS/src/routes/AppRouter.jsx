import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/main/Home';
import { AllLocations } from '../pages/main/AllLocations';
import { LocationDetail } from '../pages/main/LocationDetail';
import { NewOrder } from '../pages/order/NewOrder';
import { OrderSummary } from '../pages/order/OrderSummary';
import { OrdersHistory } from '../pages/order/OrdersHistory';

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

export const AppRouter = ({ 
  user, login, logout, 
  cart, addItem, removeItem, clearCart, total, 
  selectedLocation, setSelectedLocation, 
  ordersHistory, confirmOrder 
}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        
        <Route path="/" element={<PrivateRoute user={user}><Home user={user} logout={logout} /></PrivateRoute>} />
        
        <Route path="/order/new" element={
          <PrivateRoute user={user}>
            <NewOrder selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} cart={cart} addItem={addItem} />
          </PrivateRoute>
        } />
        
        <Route path="/order/summary" element={
          <PrivateRoute user={user}>
            <OrderSummary cart={cart} total={total} selectedLocation={selectedLocation} confirmOrder={confirmOrder} />
          </PrivateRoute>
        } />
        
        <Route path="/orders" element={
          <PrivateRoute user={user}>
            <OrdersHistory ordersHistory={ordersHistory} />
          </PrivateRoute>
        } />
        
        <Route path="/locations" element={
          <PrivateRoute user={user}>
            <AllLocations ordersHistory={ordersHistory} />
          </PrivateRoute>
        } />
        
        <Route path="/locations/:name" element={
          <PrivateRoute user={user}>
            <LocationDetail ordersHistory={ordersHistory} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};