import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { enviarAuth } from './hooks/enviarAuth';
import { usarCarrito } from './hooks/usarCarrito';
import { hookLocacion } from './hooks/hookLocacion';
import { usarPedidosNuevos } from './hooks/usarPedidosNuevos';

// Importamos las pagimas acá
import { Login } from './pages/auth/Login';
import { Home } from './pages/main/Home';
import { TodosLosLocales } from './pages/main/TodosLosLocales';
import { DetalleDeLocal } from './pages/main/DetalleDeLocal';
import { ElectorDeMenuNuevoPedido } from './pages/order/ElectorDeMenuNuevoPedido';
import { VerPedidos } from './pages/order/VerPedidos';
import { OrdersHistory } from './pages/order/OrdersHistory';

//NO SE QUE HACE
// Esta linea se fija si el user tiene hijos, si no tiene hijos es porque user esta vacio, entonces te manda a la pagina de login
//Solo se activa esta linea si la ruta es privada y uno quiere entrar sin tener una cuenta iniciada
const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  //Este es el hook que se inicializa cuando comienza la app, le dice a la app QUIEN esta logeado
  //Llama a enviarAuth que es la funcion que nos devuelve el usuario
  //Se llama al inicio porque es un componente con memoria, luego le envia esta memoria a los componentes
  //que vamos a usar despues y precisan la info de quien es el usuario.
  //Tambien le envia la funcionalidad a los botones login y logout que estan definidos dentro
  //Estan definidos dentro porque afectan la misma propiedad.
  const {
    user,
    login,
    logout
  } = enviarAuth();


  // Hook del carrito, agrega y borra items del carrito usando los otros el hook de usarPedidosNuevos, con memoria!
  const { carrito, agregarItem, limpiarCarrito, total } = usarCarrito();

  // Hook de la ubicacion, guarda a que local vamos a entregar en la pantalla de agregar pedido
  //Empieza valiendo null
  //
  const { localSeleccionado, establecerLocacion } = hookLocacion();

  // Hook de pedidos, crea nuevos pedidos y los guarda en el historial del tipo del delivery
  const { historialDeOrdenes, confirmarOrden } = usarPedidosNuevos({ user, carrito, localSeleccionado, total, limpiarCarrito });

  return (
    //Usamos el BrowserRouter para simplificar la forma en la que asignan los props a los componentes, es la que establece que prop se envia a que ruta.
    //Cuando el sistema detecta una URL nos carga la pagina detallada, si es una ruta privada nos manda a login
    <BrowserRouter>
      <Routes>
        {/* Rutas de login */}
        <Route path="/login" element={
          <Login login={login} />
        } />

        <Route path="/"
          element={<PrivateRoute
            user={user}>
            <Home user={user} logout={logout} />
          </PrivateRoute>} />
        {/* Ruta para armar un nuevo pedido, le pasamos los props para que envie el local seleccionado a hookLocacion*/}
        <Route path="/pedido/new" element={
          <PrivateRoute user={user}>
            <ElectorDeMenuNuevoPedido localSeleccionado={localSeleccionado}
              establecerLocacion={establecerLocacion}
              carrito={carrito}
              agregarItem={agregarItem} />
          </PrivateRoute>
        } />
        {/* Resumen del pedido tomando los items que estan en la memoria, desde acá se envia usarPedidosNuevos y confirmar pedido*/}
        <Route path="/pedido/summary" element={
          <PrivateRoute user={user}>

            <VerPedidos
              carrito={carrito}
              total={total}
              localSeleccionado={localSeleccionado}
              confirmarOrden={confirmarOrden} />
          </PrivateRoute>
        } />
        {/* Pagina de historial de pedidos, no envia nada y nos muestra lo que hay en la base de datos.*/}
        <Route path="/pedidos" element={
          <PrivateRoute user={user}>
            <OrdersHistory
              user={user}
              historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>
        } />

        {/* Pagina que nos muestra todos los locales a los que enviamos cosas, se puede clickear en el local para ver los envios hechos*/}
        <Route path="/locations" element={
          <PrivateRoute user={user}>
            <TodosLosLocales
              historialDeOrdenes={historialDeOrdenes} />
          </PrivateRoute>
        } />

        {/* Ruta que nos muestra el detalle de los pedidos que historicamente hizo el local*/}
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
}

export default App;
