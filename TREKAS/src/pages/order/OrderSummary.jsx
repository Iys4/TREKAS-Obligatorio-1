import React from 'react';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Card } from '../../components/ui/Card';
import { SummaryItemRow } from '../../components/ui/SummaryItemRow';
import { TotalSummaryRow } from '../../components/ui/TotalSummaryRow';
import { useOrderSummary } from '../../hooks/useOrderSummary';

// Esta es la pagina donde vemos el resumen del pedido
// Le manda los props que recibe de App.jsx a useOrderSummary
export const OrderSummary = ({ cart, total, selectedLocation, confirmOrder }) => {
  const {
    isEmpty,
    handleConfirm,
    navigateToNewOrder,
  } = useOrderSummary({ confirmOrder, cart, selectedLocation });

  // Handle de que pasa si el carrito esta vacio, en teoria no deberia pasar porque no podes avanzar a esta pagina con el carrito vacio
  if (isEmpty) {
    return (
      <ScreenLayout title="Resumen" showBack>
        <div className="text-center">
          <p>No hay productos en el carrito o no se seleccionó un local.</p>
          <PrimaryButton title="VOLVER" onClick={navigateToNewOrder} />
        </div>
      </ScreenLayout>
    );
  }

  // La parte visual del sistema
  return (
    <ScreenLayout 
      title="Resumen de Pedido" 
      showBack 
      footer={
        <div className="footer-action">
          <PrimaryButton title="CONFIRMAR PEDIDO" onClick={handleConfirm} />
        </div>
      }
    >
      <Card title="Destino" titleClassName="text-primary mb-1">
        <p className="text-lg text-bold">{selectedLocation.name}</p>
        <p className="text-muted">{selectedLocation.address}</p>
      </Card>

      <Card title="Productos">
        {cart.map(item => (
          <SummaryItemRow 
            key={item.product.id}
            name={item.product.name}
            quantity={item.quantity}
            price={item.product.price}
          />
        ))}
        <TotalSummaryRow total={total} />
      </Card>
    </ScreenLayout>
  );
};

