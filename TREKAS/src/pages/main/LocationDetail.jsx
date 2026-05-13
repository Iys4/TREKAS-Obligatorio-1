<<<<<<< Updated upstream
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { OrderCard } from '../../components/ui/OrderCard';
import { CartContext } from '../../context/CartContext';
import { LOCATIONS } from '../../mockData';

export const LocationDetail = () => {
  const { name } = useParams();
  const { ordersHistory } = useContext(CartContext);
=======
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { OrderCard } from '../../components/ui/OrderCard';
import { LOCATIONS } from '../../mockData';

export const LocationDetail = ({ ordersHistory = [] }) => {
  const { name } = useParams();
>>>>>>> Stashed changes
  
  // Decodificar el nombre de la URL
  const locationName = decodeURIComponent(name);
  
  const locationInfo = LOCATIONS.find(l => l.name === locationName);
  const locationOrders = ordersHistory.filter(order => order.location === locationName);

  return (
    <div className="flex-col-full">
      <Header title="Detalle del Local" showBack />
      
      <div className="screen-container">
        {locationInfo ? (
          <div className="card-padded card" style={{ borderLeft: '6px solid var(--primary)' }}>
            <h2 className="text-primary mb-1">{locationInfo.name}</h2>
            <p className="text-muted">{locationInfo.address}</p>
          </div>
        ) : (
          <div className="card-padded text-center">
            <h2>{locationName}</h2>
          </div>
        )}

        <h3 className="mb-3 text-lg">Historial de Pedidos ({locationOrders.length})</h3>

        {locationOrders.length > 0 ? (
          locationOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            Este local aún no tiene pedidos realizados.
          </p>
        )}
      </div>
    </div>
  );
};
