import React from 'react';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { OrderCard } from '../../components/ui/OrderCard';
import { LocationHeaderCard } from '../../components/ui/LocationHeaderCard';
import { useLocationDetail } from '../../hooks/useLocationDetail';

export const LocationDetail = ({ ordersHistory }) => {
  const {
    locationName,
    locationInfo,
    locationOrders,
  } = useLocationDetail({ ordersHistory });

  return (
    <ScreenLayout title="Detalle del Local" showBack>
      {/* Banner con la info del local, el nombre y la direccion */}
      <LocationHeaderCard 
        locationInfo={locationInfo} 
        fallbackName={locationName} 
      />

      {/* Encabezado de historial */}
      <SectionTitle title={`Historial de Pedidos (${locationOrders.length})`} className="mb-3 text-lg" />

      {/* Si hay itemws en el array de locationOrders los lee todos y los muestra en un OrderCard. Con todos los datos necesarios*/}
      {locationOrders.length > 0 ? (
        locationOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      ) : (
        <p className="text-center text-muted mt-4">
          Este local aún no tiene pedidos realizados.
        </p>
      )}
    </ScreenLayout>
  );
};
