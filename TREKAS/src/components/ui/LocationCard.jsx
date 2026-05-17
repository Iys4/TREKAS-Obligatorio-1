import React from 'react';
import { Badge } from './Badge';

export const LocationCard = ({ location, orders, onClick }) => {
  const hasOrders = orders.length > 0;

  return (
    <div 
      onClick={onClick}
      className="card-interactive"
      style={{ borderLeft: hasOrders ? '6px solid #4CAF50' : '1px solid #ddd' }}
    >
      <div className="flex-between">
        <h3 className="m-0">{location.name}</h3>
        {hasOrders && (
          <Badge text={`${orders.length} PEDIDO(S)`} color="green" />
        )}
      </div>
      <p className="text-muted text-sm mt-2" style={{ marginTop: '4px' }}>{location.address}</p>
      
      {hasOrders && (
        <div className="mt-2 pt-2" style={{ borderTop: '1px dotted #eee', paddingTop: '12px' }}>
          <p className="text-xs-bold mb-1" style={{ color: '#666' }}>ÚLTIMOS PEDIDOS:</p>
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className="item-row">
              <span>{order.date}</span>
              <span className="text-bold">${order.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
