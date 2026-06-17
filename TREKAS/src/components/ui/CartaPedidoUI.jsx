import React from 'react';
import { ColorDestaqueUI } from './ColorDestaqueUI';

const getRelativeTime = (createdAt, dateStr) => {
  const date = createdAt ? new Date(createdAt) : new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  
  if (isNaN(diffMs) || diffMs < 0) {
    return `Fecha: ${dateStr}`;
  }
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return "Hace instantes";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  return `Hace ${diffDays} d`;
};

export const CartaPedidoUI = ({ pedido }) => {
  const isEnCamino = pedido.status === 'EN CAMINO';
  
  const statusText = isEnCamino 
    ? getRelativeTime(pedido.createdAt, pedido.date)
    : pedido.status;

  return (
    <div className="card" style={{ borderLeft: `6px solid ${isEnCamino ? '#2196F3' : 'var(--primary)'}` }}>
      <div className="flex-between mb-1">
        <h3 className="m-0">{pedido.location}</h3>
        <ColorDestaqueUI
          text={statusText}
          color={isEnCamino ? 'blue' : 'orange'}
        />
      </div>

      <p className="text-sm mb-2">
        {pedido.date} • Total: <strong>${pedido.total}</strong>
      </p>

      <div className="pedido-items-list">
        <p className="text-xs-bold mb-1">ÍTEMS PEDIDOS:</p>
        {pedido.items.map((item, idx) => (
          <div key={idx} className="item-row">
            <span>{item.name}</span>
            <span className="text-bold">x{item.cantidad}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
