import React from 'react';
import { ColorDestaqueUI } from './ColorDestaqueUI';

export const CartaPedidoUI = ({ pedido }) => {
  const isEnCamino = pedido.status === 'EN CAMINO';

  return (
    <div className="card" style={{ borderLeft: `6px solid ${isEnCamino ? '#2196F3' : 'var(--primary)'}` }}>
      <div className="flex-between mb-1">
        <h3 className="m-0">{pedido.location}</h3>
        <ColorDestaqueUI
          text={pedido.status}
          color={isEnCamino ? 'blue' : 'orange'}
        />
      </div>

      <p className="text-sm text-muted mb-2">
        {pedido.date} • Total: <strong>${pedido.total}</strong>
      </p>

      <div className="pedido-items-list">
        <p className="text-xs-bold mb-1" style={{ color: '#666' }}>ÍTEMS PEDIDOS:</p>
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
