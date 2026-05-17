import React from 'react';

export const BotonPrincipalUI = ({ title, outline, ...props }) => (
  <button className={`btn-primary ${outline ? 'btn-outline' : ''}`} {...props}>
    {title}
  </button>
);
