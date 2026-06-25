import { useNavigate } from 'react-router-dom';

export const usarResumenDePedidos = ({ confirmarOrden, carrito, localSeleccionado, total, limpiarCarrito, establecerLocacion }) => {
  const nav = useNavigate();

  // Le envia esto a VerPedidos para que sepa rapidamente si el carrito esta vacio o se deselecciono la locacion, es para casos fringe
  const isEmpty = !localSeleccionado || !carrito || carrito.length === 0;

  // Es la funcion que se envia cuando apretas CONFIRMAR PEDIDO, te devuelve a la pantalla principal "/" y lanza confirmarOrden para que quede guardada la memoria en la base de datos
  const confirmadorDePedidos = async () => {
    if (confirmarOrden) {
      try {
        await confirmarOrden({ carrito, localSeleccionado, total, limpiarCarrito });
        if (establecerLocacion) {
          establecerLocacion(null);
        }
        nav('/');
      } catch (error) {
        alert("Error al confirmar el pedido: " + error.message);
      }
    } else {
      nav('/');
    }
  };

  // Manejador para volver a la pantalla de nuevo pedido cuando se quiere ir para atras
  const irAtrasResumenDePedidos = () => {
    nav(-1);
  };

  return {
    isEmpty,
    confirmadorDePedidos,
    irAtrasResumenDePedidos,
  };
};
