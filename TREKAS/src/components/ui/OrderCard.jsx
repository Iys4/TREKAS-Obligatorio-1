import React from 'react';

export const OrderCard = ({ order }) => {
  const isEnCamino = order.status === 'EN CAMINO';

  return (
    <div className="card" style={{ borderLeft: `6px solid ${isEnCamino ? '#2196F3' : 'var(--primary)'}` }}>
      <div className="flex-between mb-1">
        <h3 className="m-0">{order.location}</h3>
        <span className={`badge ${isEnCamino ? 'badge-blue' : 'badge-orange'}`}>
          {order.status}
        </span>
      </div>

      <p className="text-sm text-muted mb-2">
        {order.date} • Total: <strong>${order.total}</strong>
      </p>

      <div className="order-items-list">
        <p className="text-xs-bold mb-1" style={{ color: '#666' }}>ÍTEMS PEDIDOS:</p>
        {order.items.map((item, idx) => (
          <div key={idx} className="item-row">
            <span>{item.name}</span>
            <span className="text-bold">x{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
