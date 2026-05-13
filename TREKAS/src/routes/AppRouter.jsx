import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/main/Home';
import { AllLocations } from '../pages/main/AllLocations';
import { NewOrder } from '../pages/order/NewOrder';
import { OrderSummary } from '../pages/order/OrderSummary';
import { OrdersHistory } from '../pages/order/OrdersHistory';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/order/new" element={<PrivateRoute><NewOrder /></PrivateRoute>} />
        <Route path="/order/summary" element={<PrivateRoute><OrderSummary /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrdersHistory /></PrivateRoute>} />
        <Route path="/locations" element={<PrivateRoute><AllLocations /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};