import { useState, useEffect, useMemo } from 'react';

// Haversine formula to calculate distance in km between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Hook para la lógica del mapa en la pantalla Home.
 * Se encarga de obtener la geolocalización del conductor, filtrar los pedidos activos
 * y calcular el local con pedidos activos más cercano.
 * @param {{ locales: Array, historialDeOrdenes: Array }} params
 */
export const usarMapaHome = ({ locales = [], historialDeOrdenes = [] }) => {
  const [coords, setCoords] = useState(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [errorGeo, setErrorGeo] = useState(null);
  const [closestStore, setClosestStore] = useState(null);

  // Filtramos los pedidos activos
  const pedidosActivos = useMemo(
    () => historialDeOrdenes.filter(p => p.activo === true),
    [historialDeOrdenes]
  );

  const obtenerUbicacion = () => {
    setLoadingGeo(true);
    setErrorGeo(null);
    if (!navigator.geolocation) {
      setErrorGeo("La geolocalización no está soportada por tu navegador.");
      setLoadingGeo(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoadingGeo(false);
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        setErrorGeo("No se pudo obtener la ubicación. Asegurate de dar permisos de GPS.");
        setLoadingGeo(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    obtenerUbicacion();
  }, []);

  useEffect(() => {
    if (!coords || locales.length === 0 || pedidosActivos.length === 0) {
      setClosestStore(null);
      return;
    }

    // Filter stores that have at least one active order
    const storesWithOrders = locales.filter(local => 
      pedidosActivos.some(pedido => pedido.location === local.name)
    );

    if (storesWithOrders.length === 0) {
      setClosestStore(null);
      return;
    }

    let nearest = null;
    let minDistance = Infinity;

    storesWithOrders.forEach(store => {
      if (store.coordenadas && store.coordenadas.length === 2) {
        const dist = getDistance(
          coords.latitude,
          coords.longitude,
          store.coordenadas[0],
          store.coordenadas[1]
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearest = { ...store, distance: dist };
        }
      }
    });

    setClosestStore(nearest);
  }, [coords, locales, pedidosActivos]);

  return {
    pedidosActivos,
    coords,
    loadingGeo,
    errorGeo,
    closestStore,
    obtenerUbicacion,
  };
};
