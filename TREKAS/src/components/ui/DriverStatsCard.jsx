import React from 'react';
import { Card } from './Card';

export const DriverStatsCard = ({ name, hoursWorked, ordersCount }) => (
  <Card title={name} className="card-padded text-center mb-4">
    <div className="flex-around stats-container">
      <div>
        <p className="text-xxl text-bold m-0">{hoursWorked}</p>
        <p className="text-xs text-muted m-0">Horas Trabajadas</p>
      </div>
      <div className="stat-divider"></div>
      <div>
        <p className="text-xxl text-bold m-0">{ordersCount}</p>
        <p className="text-xs text-muted m-0">Envíos Realizados</p>
      </div>
    </div>
  </Card>
);
