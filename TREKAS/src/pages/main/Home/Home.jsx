import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';

//Esta pagina routea al usuario a cualquiera de las paginas que quiera ver, luego el app.jsx se encarga de cargar la pagina

export const Home = ({ user, logout }) => {
  const nav = useNavigate();
  return (
    <div className="screen-container">
      <h2 className="mb-4">Hola, {user?.name}</h2>
      <div className="map-placeholder mb-4">
        <strong>[ MAPA ZONA ]</strong>
      </div>
      <BotonPrincipalUI title="NUEVO PEDIDO" onClick={() => nav('/pedido/new')} />
      <BotonPrincipalUI title="MI PERFIL" outline onClick={() => nav('/pedidos')} />
      <BotonPrincipalUI title="VER TODOS LOS LOCALES" outline onClick={() => nav('/locations')} />
      <BotonPrincipalUI title="CERRAR SESIÓN" outline onClick={logout}/>
    </div>
  );
};
