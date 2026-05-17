import React from 'react';

export const ColorDestaqueUI = ({ text, color = 'green', className = '' }) => (
  <span className={`badge badge-${color} ${className}`}>
    {text}
  </span>
);
