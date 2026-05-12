import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PRODUCTS } from '../../mockData';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <div className="screen-container">
      <h2 style={{ marginBottom: '24px' }}>Hola, {user?.name}</h2>
      <div style={{ height: '150px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <strong>[ MAPA ZONA ]</strong>
      </div>
      <PrimaryButton title="NUEVO PEDIDO" onClick={() => nav('/order/new')} />
      <PrimaryButton title="MIS PEDIDOS" outline onClick={() => nav('/orders')} />
      <PrimaryButton title="MI PERFIL" outline onClick={() => nav('/profile')} />
      <PrimaryButton title="CERRAR SESIÓN" outline onClick={logout} style={{ borderColor: 'red', color: 'red' }} />
    </div>
  );
};