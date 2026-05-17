import React from 'react';

export const ItemCheckoutUI = ({ name, cantidad, precio }) => (
  <div className="flex-between mb-2 pb-1" style={{ borderBottom: '1px solid #eee' }}>
    <div>
      <p className="text-bold">{name}</p>
      <p className="text-sm text-muted">{cantidad} x ${precio}</p>
    </div>
    <p className="text-bold">${cantidad * precio}</p>
  </div>
);
