import React from 'react';

export const InputUI = ({ label, error, ...props }) => (
  <div className="input-group">
    {label && <label>{label}</label>}
    <input className={error ? 'error' : ''} {...props} />
    {error && <span className="error-text">{error}</span>}
  </div>
);
