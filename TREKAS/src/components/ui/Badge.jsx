import React from 'react';

export const Badge = ({ text, color = 'green', className = '' }) => (
  <span className={`badge badge-${color} ${className}`}>
    {text}
  </span>
);
