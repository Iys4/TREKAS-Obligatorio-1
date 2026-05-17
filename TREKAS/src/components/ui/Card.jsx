import React from 'react';

export const Card = ({ title, children, className = '', titleClassName = 'text-primary mb-3', style }) => (
  <div className={`card mb-4 ${className}`} style={style}>
    {title && <h2 className={titleClassName}>{title}</h2>}
    {children}
  </div>
);

