import React, { useState } from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { CartaPedidoUI } from '../../../components/ui/CartaPedidoUI';
import { DescripcionConductorUI } from '../../../components/ui/DescripcionConductorUI';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { InputUI } from '../../../components/ui/InputUI';

const PERFIL_CONDUCTOR = {
  name: "Juan Pérez",
  horasTrabajadas: 32,
};

//Esta pagina nos muestra la informacion del usuario, en el caso de test nos muestra a todos los pedidos de la lista de pedidos

export const HistorialDePedidos = ({ user, historialDeOrdenes, updateUserName }) => {
  // Mostramos todos los pedidos sin importar quién los hizo
  const pedidosHechos = historialDeOrdenes;

  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  
  const [criterioOrden, setCriterioOrden] = useState('fecha_desc'); // fecha_desc, fecha_asc, tamano_desc, tamano_asc

  const currentName = user?.data?.nombre || user?.name || '';
  const noTieneNombre = !currentName || currentName.trim() === '';

  const handleGuardarNombre = () => {
    if (nuevoNombre.trim() !== '') {
      updateUserName(nuevoNombre);
    }
    setEditandoNombre(false);
  };

  const pedidosOrdenados = [...pedidosHechos].sort((a, b) => {
    if (criterioOrden === 'fecha_desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (criterioOrden === 'fecha_asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (criterioOrden === 'tamano_desc') {
      return b.total - a.total;
    } else if (criterioOrden === 'tamano_asc') {
      return a.total - b.total;
    }
    return 0;
  });

  return (
    <ScreenLayout title="Mis Pedidos" showBack>
      {noTieneNombre && !editandoNombre && (
        <div className="mb-4" style={{ backgroundColor: 'var(--warning-light, #fff3cd)', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0', color: '#856404' }}>Todavía no tenés un nombre asignado.</p>
          <BotonPrincipalUI title="AGREGAR MI NOMBRE" onClick={() => {
            setNuevoNombre('');
            setEditandoNombre(true);
          }} />
        </div>
      )}

      {editandoNombre && (
        <div className="mb-4">
          <InputUI 
            label="Tu Nombre" 
            value={nuevoNombre} 
            onChange={(e) => setNuevoNombre(e.target.value)} 
            placeholder="Escribí tu nombre acá"
          />
          <BotonPrincipalUI title="GUARDAR" onClick={handleGuardarNombre} />
          <BotonPrincipalUI title="CANCELAR" outline onClick={() => setEditandoNombre(false)} />
        </div>
      )}

      {!editandoNombre && !noTieneNombre && (
        <div className="mb-4 text-center">
          <BotonPrincipalUI title="CAMBIAR NOMBRE" outline onClick={() => {
            setNuevoNombre(currentName);
            setEditandoNombre(true);
          }} />
        </div>
      )}

      {/* Nos muestra las metricas del conductor actual */}
      <DescripcionConductorUI
        name={currentName || PERFIL_CONDUCTOR.name}
        horasTrabajadas={user?.data?.horasTrabajadas || PERFIL_CONDUCTOR.horasTrabajadas}
        numeroDeOrdenes={pedidosHechos.length}
      />
      {/* Carga el historial de pedidos que hizo el conductor especifico */}
      <div className="flex-between align-center mb-3">
        <TitulosDeSeccionUI title="Historial" />
        <select 
          value={criterioOrden} 
          onChange={(e) => setCriterioOrden(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
        >
          <option value="fecha_desc">Más recientes primero</option>
          <option value="fecha_asc">Más antiguos primero</option>
          <option value="tamano_desc">Mayor tamaño primero</option>
          <option value="tamano_asc">Menor tamaño primero</option>
        </select>
      </div>

      {pedidosOrdenados.map(pedido => (
        <CartaPedidoUI key={pedido.id} pedido={pedido} />
      ))}
    </ScreenLayout>
  );
};
