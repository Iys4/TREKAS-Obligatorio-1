import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../mockData';

//Estas son las funciones que luego se usan en AllLocations para mostrar las localidades, usar filtros de busqueda por nombre y manejar cuando clickeas en un local para ver sus pedidos

export const useAllLocations = ({ ordersHistory }) => {
  const [search, setSearch] = useState('');
  const nav = useNavigate();

  // Filtrar locales
  const filteredLocations = LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  //Lee todo el array de pedidos y suma un numero cada ves que se muestre el local como el local target, muy poco eficiente.
  const getOrdersForLocation = (locationName) => {
    return ordersHistory.filter(order => order.location === locationName);
  };

  // Nos envia al URL del local que se quiere saber el detalle
  const navigateToLocation = (locationName) => {
    nav(`/locations/${encodeURIComponent(locationName)}`);
  };

  return {
    search,
    setSearch,
    filteredLocations,
    getOrdersForLocation,
    navigateToLocation,
  };
};
