import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { enviarAuth } from './hooks/enviarAuth';
import { usarPedidosNuevos } from './hooks/usarPedidosNuevos';

// Importamos las paginas acá
import { Login } from './pages/auth/Login/Login';
import { Register } from './pages/auth/Register/Register';
import { Home } from './pages/main/Home/Home';
import { TodosLosLocales } from './pages/main/TodosLosLocales/TodosLosLocales';
import { DetalleDeLocal } from './pages/main/DetalleDeLocal/DetalleDeLocal';
import { ElectorDeMenuNuevoPedido } from './pages/order/ElectorDeMenuNuevoPedido/ElectorDeMenuNuevoPedido';
import { VerPedidos } from './pages/order/VerPedidos/VerPedidos';
import { HistorialDePedidos } from './pages/order/HistorialDePedidos/HistorialDePedidos';
import { NotFound } from './pages/main/NotFound/NotFound';

// Esta linea se fija si el user tiene hijos, si no tiene hijos es porque user esta vacio, entonces te manda a la pagina de login
//Solo se activa esta linea si la ruta es privada y uno quiere entrar al URL sin tener una cuenta iniciada
const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  //Este es el hook que se inicializa cuando comienza la app, le dice a la app QUIEN esta logeado
  //Llama a enviarAuth que es la funcion que nos devuelve el usuario
  //Se llama al inicio porque es un componente con memoria, luego le envia esta memoria a los componentes
  //que vamos a usar despues y precisan la info de quien es el usuario y los contenidos del carrito.
  //Tambien le envia la funcionalidad a los botones login y logout que estan definidos dentro.
  const {
    user,
    login,
    logout,
    register,
    updateUserName
  } = enviarAuth();

  // Hook de pedidos, crea nuevos pedidos y los guarda en el historial del tipo del delivery
  //VER SI SE PUEDE ARREGLAR
  const { historialDeOrdenes, confirmarOrden, marcarEntregado } = usarPedidosNuevos({ user });

  return (
    //Usamos el BrowserRouter para simplificar la forma en la que asignan los props a los componentes, es la que establece que prop se envia a que ruta.
    //Cuando el sistema detecta una URL nos carga la pagina detallada, si es una ruta privada nos manda a login
    <BrowserRouter>
      <Routes>
        {/* Rutas de login */}
        <Route path="/login" element={
          <Login login={login} />
        } />
        <Route path="/register" element={
          <Register register={register} />
        } />

        <Route path="/"
          element={<PrivateRoute
            user={user}>
            <Home user={user} logout={logout} historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>} />
        {/* Ruta para armar un nuevo pedido, le pasamos los props para que envie el local seleccionado a hookLocacion*/}
        <Route path="/pedido/new" element={
          <PrivateRoute user={user}>
            <ElectorDeMenuNuevoPedido user={user} />
          </PrivateRoute>
        } />
        {/* Resumen del pedido tomando los items que estan en la memoria, desde acá se envia usarPedidosNuevos y confirmar pedido*/}
        <Route path="/pedido/summary" element={
          <PrivateRoute user={user}>

            <VerPedidos
              user={user}
              confirmarOrden={confirmarOrden} />
          </PrivateRoute>
        } />
        {/* Pagina de historial de pedidos, no envia nada y nos muestra lo que hay en la base de datos.*/}
        <Route path="/pedidos" element={
          <PrivateRoute user={user}>
            <HistorialDePedidos
              user={user}
              historialDeOrdenes={historialDeOrdenes}
              updateUserName={updateUserName} />
          </PrivateRoute>
        } />

        {/* Pagina que nos muestra todos los locales a los que enviamos cosas, se puede clickear en el local para ver los envios hechos*/}
        <Route path="/locations" element={
          <PrivateRoute user={user}>
            <TodosLosLocales
              historialDeOrdenes={historialDeOrdenes}
              user={user}
              marcarEntregado={marcarEntregado} />
          </PrivateRoute>
        } />

        {/* Ruta que nos muestra el detalle de los pedidos que historicamente hizo el local*/}
        <Route path="/locations/:name" element={
          <PrivateRoute user={user}>
            <DetalleDeLocal
              historialDeOrdenes={historialDeOrdenes}
              user={user}
              marcarEntregado={marcarEntregado} />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
