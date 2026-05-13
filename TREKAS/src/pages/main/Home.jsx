import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const Home = ({ user, logout }) => {
  const nav = useNavigate();
  return (
    <div className="screen-container">
      <h2 className="mb-4">Hola, {user?.name}</h2>
      <div className="map-placeholder mb-4">
        <strong>[ MAPA ZONA ]</strong>
      </div>
      <PrimaryButton title="NUEVO PEDIDO" onClick={() => nav('/order/new')} />
      <PrimaryButton title="MI PERFIL" outline onClick={() => nav('/orders')} />
      <PrimaryButton title="VER TODOS LOS LOCALES" outline onClick={() => nav('/locations')} />
      <PrimaryButton title="CERRAR SESIÓN" outline onClick={logout} style={{ borderColor: 'var(--error)', color: 'var(--error)' }} />
    </div>
  );
};