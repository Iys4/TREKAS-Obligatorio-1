import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/main/Home';
import { TodosLosLocales } from '../pages/main/TodosLosLocales';
import { DetalleDeLocal } from '../pages/main/DetalleDeLocal';
import { ElectorDeMenuNuevoPedido } from '../pages/pedido/ElectorDeMenuNuevoPedido';
import { VerPedidos } from '../pages/pedido/VerPedidos';
import { OrdersHistory } from '../pages/pedido/OrdersHistory';

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

export const AppRouter = ({
  user, login, logout,
  carrito, agregarItem, removeItem, limpiarCarrito, total,
  localSeleccionado, establecerLocacion,
  historialDeOrdenes, confirmarOrden
}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />

        <Route path="/" element={<PrivateRoute 
        user={user}>
          <Home user={user} logout={logout} /></PrivateRoute>} />

        <Route path="/pedido/new" element={
          <PrivateRoute user={user}>
            <ElectorDeMenuNuevoPedido 
            localSeleccionado={localSeleccionado} 
            establecerLocacion={establecerLocacion} 
            carrito={carrito} 
            agregarItem={agregarItem} />
          </PrivateRoute>
        } />

        <Route path="/pedido/summary" element={
          <PrivateRoute user={user}>
            <VerPedidos 
            carrito={carrito} 
            total={total} 
            localSeleccionado={localSeleccionado} 
            confirmarOrden={confirmarOrden} />
          </PrivateRoute>
        } />

        <Route path="/pedidos" element={
          <PrivateRoute user={user}>
            <OrdersHistory 
            historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>
        } />

        <Route path="/locations" element={
          <PrivateRoute user={user}>
            <TodosLosLocales 
            historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>
        } />

        <Route path="/locations/:name" element={
          <PrivateRoute user={user}>
            <DetalleDeLocal 
            historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};