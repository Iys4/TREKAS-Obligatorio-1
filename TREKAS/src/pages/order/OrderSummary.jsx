import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { CartContext } from '../../context/CartContext';

export const OrderSummary = () => {
  const { cart, total, selectedLocation, confirmOrder } = useContext(CartContext);
  const nav = useNavigate();

  const handleConfirm = () => {
    confirmOrder();
    nav('/');
  };

  if (!selectedLocation || cart.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Header title="Resumen" showBack />
        <div className="screen-container" style={{ textAlign: 'center' }}>
          <p>No hay productos en el carrito o no se seleccionó un local.</p>
          <PrimaryButton title="VOLVER" onClick={() => nav('/order/new')} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header title="Resumen de Pedido" showBack />
      <div className="screen-container">
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ddd' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Destino</h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{selectedLocation.name}</p>
          <p style={{ color: 'var(--text-muted)' }}>{selectedLocation.address}</p>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ddd' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Productos</h2>
          {cart.map(item => (
            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>{item.product.name}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.quantity} x ${item.product.price}</p>
              </div>
              <p style={{ fontWeight: 'bold' }}>${item.quantity * item.product.price}</p>
            </div>
          ))}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '8px' }}>
            <h3 style={{ fontSize: '1.3rem' }}>TOTAL</h3>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>${total}</h3>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #ccc' }}>
        <PrimaryButton title="CONFIRMAR PEDIDO" onClick={handleConfirm} />
      </div>
    </div>
  );
};
