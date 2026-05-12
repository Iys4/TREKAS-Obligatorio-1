import React from 'react';
export const PrimaryButton = ({ title, outline, ...props }) => (
  <button className={`btn-primary ${outline ? 'btn-outline' : ''}`} {...props}>{title}</button>
);