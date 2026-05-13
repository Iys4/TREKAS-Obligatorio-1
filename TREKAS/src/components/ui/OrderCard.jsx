import React from 'react';

export const OrderCard = ({ order }) => {
  const isEnCamino = order.status === 'EN CAMINO';

  return (
    <div style={{
      background: 'white',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px',
      border: '1px solid #ddd',
      borderLeft: `6px solid ${isEnCamino ? '#2196F3' : 'var(--primary)'}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0 }}>{order.location}</h3>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '4px',
          background: isEnCamino ? '#E3F2FD' : '#FFF3E0',
          color: isEnCamino ? '#1976D2' : 'var(--primary)'
        }}>
          {order.status}
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        {order.date} • Total: <strong>\${order.total}</strong>
      </p>

      <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>ÍTEMS PEDIDOS:</p>
        {order.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>{item.name}</span>
            <span style={{ fontWeight: 'bold' }}>x{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
