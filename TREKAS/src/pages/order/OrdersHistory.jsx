import React, { useContext } from 'react';
import { Header } from '../../components/layout/Header';
import { DRIVER_PROFILE } from '../../mockData';
import { OrderCard } from '../../components/ui/OrderCard';
import { CartContext } from '../../context/CartContext';

export const OrdersHistory = () => {
  const { ordersHistory } = useContext(CartContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header title="Mis Pedidos" showBack />
      
      <div className="screen-container">
        {/* Métricas del Repartidor */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '24px', 
          border: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '16px' }}>{DRIVER_PROFILE.name}</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{DRIVER_PROFILE.hoursWorked}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Horas Trabajadas</p>
            </div>
            <div style={{ width: '1px', background: '#eee' }}></div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{ordersHistory.length}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Envíos Realizados</p>
            </div>
          </div>
        </div>

        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Historial</h2>
        
        {ordersHistory.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

