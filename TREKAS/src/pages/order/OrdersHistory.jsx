import React from 'react';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { DRIVER_PROFILE } from '../../mockData';
import { OrderCard } from '../../components/ui/OrderCard';
import { DriverStatsCard } from '../../components/ui/DriverStatsCard';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const OrdersHistory = ({ user, ordersHistory }) => {
  // Filtramos para obtener solo los pedidos del usuario actualmente conectado
  const driverOrders = ordersHistory.filter(order => order.driverEmail === user?.email);

  return (
    <ScreenLayout title="Mis Pedidos" showBack>
      {/* Nos muestra las metricas del conductor actual */}
      <DriverStatsCard 
        name={user?.name || DRIVER_PROFILE.name}
        hoursWorked={DRIVER_PROFILE.hoursWorked}
        ordersCount={driverOrders.length}
      />
      {/* Carga el historial de pedidos que hizo el conductor especifico */}
      <SectionTitle title="Historial" />
      
      {driverOrders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ScreenLayout>
  );
};
