import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';

export const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="screen-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🔍</div>
      <h1 className="mb-2" style={{ fontSize: '2rem', color: 'var(--text-main)' }}>
        404 - Página No Encontrada
      </h1>
      <p className="text-muted mb-4" style={{ maxWidth: '400px', lineHeight: '1.5' }}>
        Lo sentimos, la página que estás buscando no existe o no tienes permisos para acceder.
      </p>
      <BotonPrincipalUI 
        title="VOLVER AL INICIO" 
        onClick={() => nav('/')} 
        style={{ maxWidth: '280px', width: '100%' }}
      />
    </div>
  );
};
