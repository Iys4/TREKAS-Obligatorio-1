import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const OrderSummary = ({ cart, total, selectedLocation, confirmOrder }) => {
  const nav = useNavigate();

  const handleConfirm = () => {
    confirmOrder();
    nav('/');
  };

  if (!selectedLocation || cart.length === 0) {
    return (
      <div className="flex-col-full">
        <Header title="Resumen" showBack />
        <div className="screen-container text-center">
          <p>No hay productos en el carrito o no se seleccionó un local.</p>
          <PrimaryButton title="VOLVER" onClick={() => nav('/order/new')} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col-full">
      <Header title="Resumen de Pedido" showBack />
      <div className="screen-container">
        <div className="card mb-4">
          <h2 className="text-primary mb-1">Destino</h2>
          <p className="text-lg text-bold">{selectedLocation.name}</p>
          <p className="text-muted">{selectedLocation.address}</p>
        </div>

        <div className="card mb-4">
          <h2 className="text-primary mb-3">Productos</h2>
          {cart.map(item => (
            <div key={item.product.id} className="flex-between mb-2 pb-1" style={{ borderBottom: '1px solid #eee' }}>
              <div>
                <p className="text-bold">{item.product.name}</p>
                <p className="text-sm text-muted">{item.quantity} x ${item.product.price}</p>
              </div>
              <p className="text-bold">${item.quantity * item.product.price}</p>
            </div>
          ))}
          
          <div className="flex-between mt-3 pt-1">
            <h3 className="text-xxl">TOTAL</h3>
            <h3 className="text-xxl text-primary">${total}</h3>
          </div>
        </div>
      </div>

      <div className="footer-action">
        <PrimaryButton title="CONFIRMAR PEDIDO" onClick={handleConfirm} />
      </div>
    </div>
  );
};
