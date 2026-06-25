import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { MapaDePedidosUI } from '../../../components/ui/MapaDePedidosUI';
import { FormatoCartaUI } from '../../../components/ui/FormatoCartaUI';
import { usarLocales } from '../../../hooks/usarLocales';
import { usarMapaHome } from './usarMapaHome';

export const Home = ({ user, logout, historialDeOrdenes }) => {
  const { locales } = usarLocales(user);
  const {
    pedidosActivos,
    coords,
    loadingGeo,
    errorGeo,
    closestStore,
    obtenerUbicacion,
  } = usarMapaHome({ locales, historialDeOrdenes });
  const nav = useNavigate();

  return (
    <div className="screen-container">
      <h2 className="mb-4">Hola, {user?.data?.nombre || user?.name || "Conductor"}</h2>

      {/* Mapa de pedidos: locales con pedidos activos en naranja, sin pedidos en gris */}
      <TitulosDeSeccionUI title="Ver mapa de pedidos" />
      <div className="mb-4">
        <MapaDePedidosUI locales={locales} pedidosActivos={pedidosActivos} userCoords={coords} />
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
