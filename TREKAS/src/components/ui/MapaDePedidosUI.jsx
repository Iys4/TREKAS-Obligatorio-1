import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix de íconos para Vite (no soporta require(), usamos divIcon con SVG)
// Naranja para locales con pedidos activos, gris para los que no tienen
const crearIconoMarcador = (conPedidoActivo) => {
  const color = conPedidoActivo ? '#FF8C00' : '#9E9E9E';
  return L.divIcon({
    className: '',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="11" fill="${color}" stroke="white" stroke-width="2.5" />
        <circle cx="14" cy="14" r="5" fill="white" opacity="0.7" />
      </svg>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
};

// Ícono azul para el conductor/usuario
const crearIconoConductor = () => {
  return L.divIcon({
    className: '',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="10" fill="#2563EB" stroke="white" stroke-width="3" />
        <circle cx="16" cy="16" r="4" fill="white" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

// Centro de Montevideo — Plaza Independencia
const CENTRO_MONTEVIDEO = [-34.9058, -56.1913];

// Componente para actualizar dinámicamente la vista del mapa
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

// Recibe la lista de locales (con coordenadas), pedidos activos y opcionalmente las coordenadas del usuario
export const MapaDePedidosUI = ({ locales = [], pedidosActivos = [], userCoords = null }) => {
  const navigate = useNavigate();

  // Construimos un Set con los nombres de los locales que tienen al menos un pedido activo
  const localesConPedidoActivo = useMemo(
    () => new Set(pedidosActivos.map(p => p.location)),
    [pedidosActivos]
  );

  const mapCenter = userCoords
    ? [userCoords.latitude, userCoords.longitude]
    : CENTRO_MONTEVIDEO;

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '350px', width: '100%', borderRadius: '12px' }}
    >
      <ChangeView center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marcador del conductor */}
      {userCoords && (
        <Marker
          position={[userCoords.latitude, userCoords.longitude]}
          icon={crearIconoConductor()}
        >
          <Popup>
            <strong>Tu ubicación actual</strong>
            <br />
            Conductor en servicio
          </Popup>
        </Marker>
      )}

      {locales.map(local => {
        // Si el local no tiene coordenadas no lo dibujamos
        if (!local.coordenadas) return null;

        const tieneActivo = localesConPedidoActivo.has(local.name);
        const icono = crearIconoMarcador(tieneActivo);

        return (
          <Marker
            key={local.id}
            position={local.coordenadas}
            icon={icono}
          >
            <Popup>
              <strong>{local.name}</strong>
              <br />
              {local.address}
              <br />
              <span style={{ color: tieneActivo ? '#FF8C00' : '#9E9E9E', fontWeight: 600 }}>
                {tieneActivo ? '● Pedido en camino' : '○ Sin pedidos activos'}
              </span>
              <div style={{ marginTop: '8px' }}>
                <button
                  onClick={() => navigate(`/locations/${encodeURIComponent(local.name)}`)}
                  style={{
                    background: 'var(--primary, #FF8C00)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  VER PEDIDOS
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
