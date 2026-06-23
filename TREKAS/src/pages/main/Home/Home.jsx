import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { MapaDePedidosUI } from '../../../components/ui/MapaDePedidosUI';
import { FormatoCartaUI } from '../../../components/ui/FormatoCartaUI';

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

export const Home = ({ user, logout, pedidosActivos, locales = [] }) => {
  const nav = useNavigate();
  const [coords, setCoords] = useState(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [errorGeo, setErrorGeo] = useState(null);
  const [closestStore, setClosestStore] = useState(null);

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

  return (
    <div className="screen-container">
      <h2 className="mb-4">Hola, {user?.data?.nombre || user?.name || "Conductor"}</h2>

      {/* Mapa de pedidos: locales con pedidos activos en naranja, sin pedidos en gris */}
      <TitulosDeSeccionUI title="Ver mapa de pedidos" />
      <div className="mb-4">
        <MapaDePedidosUI locales={locales} pedidosActivos={pedidosActivos} />
      </div>

      {/* Local más cercano con pedido */}
      <TitulosDeSeccionUI title="Local más cercano con pedidos activos" />
      <FormatoCartaUI className="mb-4 p-3" style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '15px', backgroundColor: 'var(--background-card, #fff)' }}>
        {loadingGeo && <p className="text-muted m-0">Obteniendo tu ubicación actual...</p>}
        
        {errorGeo && (
          <div>
            <p className="text-danger m-0 mb-2">{errorGeo}</p>
            <BotonPrincipalUI title="REINTENTAR OBTENER UBICACIÓN" outline onClick={obtenerUbicacion} style={{ fontSize: '0.85rem', padding: '5px 10px' }} />
          </div>
        )}

        {!loadingGeo && !errorGeo && !coords && (
          <div>
            <p className="text-muted m-0 mb-2">Ubicación no disponible.</p>
            <BotonPrincipalUI title="OBTENER UBICACIÓN" outline onClick={obtenerUbicacion} style={{ fontSize: '0.85rem', padding: '5px 10px' }} />
          </div>
        )}

        {!loadingGeo && !errorGeo && coords && (
          <div>
            {pedidosActivos.length === 0 ? (
              <p className="text-muted m-0">No hay pedidos activos en ningún local actualmente.</p>
            ) : closestStore ? (
              <div>
                <p className="m-0 text-bold" style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>
                  {closestStore.name}
                </p>
                <p className="m-0 text-muted" style={{ fontSize: '0.9rem' }}>
                  Dirección: {closestStore.address}
                </p>
                <p className="m-0 mt-2 text-bold text-success" style={{ fontSize: '0.95rem' }}>
                  Distancia aproximada: {closestStore.distance.toFixed(2)} km
                </p>
              </div>
            ) : (
              <p className="text-muted m-0">No se pudo calcular el local más cercano (verificá que los locales tengan coordenadas asignadas).</p>
            )}
          </div>
        )}
      </FormatoCartaUI>

      <BotonPrincipalUI title="NUEVO PEDIDO" onClick={() => nav('/pedido/new')} />
      <BotonPrincipalUI title="MI PERFIL" outline onClick={() => nav('/pedidos')} />
      <BotonPrincipalUI title="VER PEDIDOS ACTIVOS" outline onClick={() => nav('/locations')} />
      <BotonPrincipalUI title="CERRAR SESIÓN" outline onClick={logout}/>
    </div>
  );
};
