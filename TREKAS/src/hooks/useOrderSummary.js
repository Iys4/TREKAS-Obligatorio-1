import { useNavigate } from 'react-router-dom';

export const useOrderSummary = ({ confirmOrder, cart, selectedLocation }) => {
  const nav = useNavigate();

  // Le envia esto a OrderSummary para que sepa rapidamente si el carrito esta vacio o se deselecciono la locacion, es para casos fringe
  const isEmpty = !selectedLocation || !cart || cart.length === 0;

  // Es la funcion que se envia cuando apretas CONFIRMAR PEDIDO, te devuelve a la pantalla principal "/" y lanza confirmOrder para que quede guardada la memoria en la base de datos
  const handleConfirm = () => {
    if (confirmOrder) confirmOrder();
    nav('/');
  };

  // Manejador para volver a la pantalla de nuevo pedido
  const navigateToNewOrder = () => {
    nav('/order/new');
  };

  return {
    isEmpty,
    handleConfirm,
    navigateToNewOrder,
  };
};
