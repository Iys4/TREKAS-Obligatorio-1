import React from 'react';
import { FormatoCartaUI } from './FormatoCartaUI';

export const DescripcionConductorUI = ({ name, horasTrabajadas, numeroDeOrdenes }) => (
  <FormatoCartaUI title={name} className="text-center mb-4">
    <div className="flex-around stats-container">
      <div>
        <p className="text-xxl text-bold m-0">{horasTrabajadas}</p>
        <p className="text-xs text-muted m-0">Horas Trabajadas</p>
      </div>
      <div className="stat-divider"></div>
      <div>
        <p className="text-xxl text-bold m-0">{numeroDeOrdenes}</p>
        <p className="text-xs text-muted m-0">Envíos Realizados</p>
      </div>
    </div>
  </FormatoCartaUI>
);
