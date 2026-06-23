import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook para la pantalla "Ver Pedidos en Camino" (ruta /locations).
 * Maneja el filtro de búsqueda, el ordenamiento de locales
 * (con pedidos activos primero) y la navegación al detalle de un local.
 */
export const usarListaLocales = ({ historialDeOrdenes, locales = [] }) => {
  const [search, actualizarInput] = useState('');
  const nav = useNavigate();

  // Filtra locales por nombre o dirección según el texto ingresado
  const localesFiltrados = locales.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  // Devuelve TODOS los pedidos de un local (activos y entregados)
  const getOrdersForLocation = (locationName) =>
    historialDeOrdenes.filter(order => order.location === locationName);

  // Devuelve solo los pedidos EN CAMINO (activo === true) de un local
  const getPedidosActivosParaLocal = (locationName) =>
    historialDeOrdenes.filter(
      order => order.location === locationName && order.activo === true
    );

  // Ordena: locales con pedidos activos primero, luego el resto
  const localesOrdenados = [...localesFiltrados].sort((a, b) => {
    const aActivos = getPedidosActivosParaLocal(a.name).length;
    const bActivos = getPedidosActivosParaLocal(b.name).length;
    if (bActivos > 0 && aActivos === 0) return 1;
    if (aActivos > 0 && bActivos === 0) return -1;
    return 0;
  });

  // Navega al detalle del local
  const verDetalleDeLocal = (locationName) => {
    nav(`/locations/${encodeURIComponent(locationName)}`);
  };

  return {
    search,
    actualizarInput,
    localesOrdenados,
    getOrdersForLocation,
    getPedidosActivosParaLocal,
    verDetalleDeLocal,
  };
};
