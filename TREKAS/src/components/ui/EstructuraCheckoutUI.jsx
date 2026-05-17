import React from 'react';

export const EstructuraCheckoutUI = ({ total }) => (
  <div className="flex-between mt-3 pt-1">
    <h3 className="text-xxl">TOTAL</h3>
    <h3 className="text-xxl text-primary">${total}</h3>
  </div>
);
