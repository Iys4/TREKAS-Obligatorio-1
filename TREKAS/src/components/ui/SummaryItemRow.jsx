import React from 'react';

export const SummaryItemRow = ({ name, quantity, price }) => (
  <div className="flex-between mb-2 pb-1" style={{ borderBottom: '1px solid #eee' }}>
    <div>
      <p className="text-bold">{name}</p>
      <p className="text-sm text-muted">{quantity} x ${price}</p>
    </div>
    <p className="text-bold">${quantity * price}</p>
  </div>
);
