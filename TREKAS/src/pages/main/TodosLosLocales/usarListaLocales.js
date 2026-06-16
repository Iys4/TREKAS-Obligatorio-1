import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Estas son las funciones que luego se usan en TodosLosLocales para mostrar las localidades, usar filtros de busqueda por nombre y manejar cuando clickeas en un local para ver sus pedidos

export const usarListaLocales = ({ historialDeOrdenes, locales = [] }) => {
  const [search, actualizarInput] = useState('');
  const nav = useNavigate();

  // Filtrar locales
  const localesFiltrados = locales.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  //Lee todo el array de pedidos y suma un numero cada ves que se muestre el local como el local target, muy poco eficiente.
  const getOrdersForLocation = (locationName) => {
    return historialDeOrdenes.filter(order => order.location === locationName);
  };

  // Nos envia al URL del local que se quiere saber el detalle
  const verDetalleDeLocal = (locationName) => {
    nav(`/locations/${encodeURIComponent(locationName)}`);
  };

  return {
    search,
    actualizarInput,
    localesFiltrados,
    getOrdersForLocation,
    verDetalleDeLocal,
  };
};
