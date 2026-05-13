import React from 'react';
import { Header } from '../../components/layout/Header';
import { DRIVER_PROFILE } from '../../mockData';
import { OrderCard } from '../../components/ui/OrderCard';

export const OrdersHistory = ({ ordersHistory }) => {

  return (
    <div className="flex-col-full">
      <Header title="Mis Pedidos" showBack />
      
      <div className="screen-container">
        {/* Métricas del Repartidor */}
        <div className="card card-padded text-center">
          <h2 className="text-primary mb-3">{DRIVER_PROFILE.name}</h2>
          
          <div className="flex-around stats-container">
            <div>
              <p className="text-xxl text-bold m-0">{DRIVER_PROFILE.hoursWorked}</p>
              <p className="text-xs text-muted m-0">Horas Trabajadas</p>
            </div>
            <div className="stat-divider"></div>
            <div>
              <p className="text-xxl text-bold m-0">{ordersHistory.length}</p>
              <p className="text-xs text-muted m-0">Envíos Realizados</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl mb-3">Historial</h2>
        
        {ordersHistory.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

