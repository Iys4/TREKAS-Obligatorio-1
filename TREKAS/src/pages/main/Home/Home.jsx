import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { MapaDePedidosUI } from '../../../components/ui/MapaDePedidosUI';
// Esta pagina routea al usuario a cualquiera de las paginas que quiera ver, luego el app.jsx se encarga de cargar la pagina

export const Home = ({ user, logout, pedidosActivos, locales = [] }) => {
  const nav = useNavigate();
  return (
    <div className="screen-container">
      <h2 className="mb-4">Hola, {user?.data?.nombre || user?.name || "Conductor"}</h2>

      {/* Mapa de pedidos: locales con pedidos activos en naranja, sin pedidos en gris */}
      <TitulosDeSeccionUI title="Ver mapa de pedidos" />
      <div className="mb-4">
        <MapaDePedidosUI locales={locales} pedidosActivos={pedidosActivos} />
      </div>

      <BotonPrincipalUI title="NUEVO PEDIDO" onClick={() => nav('/pedido/new')} />
      <BotonPrincipalUI title="MI PERFIL" outline onClick={() => nav('/pedidos')} />
      <BotonPrincipalUI title="VER TODOS LOS LOCALES" outline onClick={() => nav('/locations')} />
      <BotonPrincipalUI title="CERRAR SESIÓN" outline onClick={logout} style={{ borderColor: 'var(--error)', color: 'var(--error)' }} />
    </div>
  );
};
