import React from 'react';

export const TitulosDeSeccionUI = ({ title, className = 'text-xl mb-3' }) => (
  <h2 className={className}>{title}</h2>
);
