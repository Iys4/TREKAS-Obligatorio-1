import React from 'react';

export const FormatoCartaUI = ({ title, children, className = '', titleClassName = 'mb-3', style }) => (
  <div className={`mb-4 ${className}`} style={style}>
    {title && <h2 className={titleClassName}>{title}</h2>}
    {children}
  </div>
);
