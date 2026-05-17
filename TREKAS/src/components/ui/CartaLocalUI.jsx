import React from 'react';
import { FormatoCartaUI } from './FormatoCartaUI';

export const CartaLocalUI = ({ infoDeLocal, fallbackName }) => {
  if (infoDeLocal) {
    return (
      <FormatoCartaUI
        title={infoDeLocal.name}
        titleClassName="text-primary mb-1"
        className="card-padded"
        style={{ borderLeft: '6px solid var(--primary)' }}
      >
        <p className="text-muted m-0">{infoDeLocal.address}</p>
      </FormatoCartaUI>
    );
  }

  return (
    <FormatoCartaUI className="card-padded text-center">
      <h2 className="m-0">{fallbackName}</h2>
    </FormatoCartaUI>
  );
};
