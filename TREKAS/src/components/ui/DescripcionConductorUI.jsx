import React from 'react';
import { FormatoCartaUI } from './FormatoCartaUI';

export const DescripcionConductorUI = ({ name, numeroDeOrdenes }) => (
  <FormatoCartaUI title={name} className="text-center mb-4">
    <div className="stats-container">
      <p className="text-xxl text-bold m-0">{numeroDeOrdenes}</p>
      <p className="text-xs text-muted m-0">Envíos Realizados</p>
    </div>
  </FormatoCartaUI>
);
