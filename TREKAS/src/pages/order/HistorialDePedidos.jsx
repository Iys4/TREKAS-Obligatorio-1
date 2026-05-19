import React from 'react';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { PERFIL_CONDUCTOR } from '../../mockData';
import { CartaPedidoUI } from '../../components/ui/CartaPedidoUI';
import { DescripcionConductorUI } from '../../components/ui/DescripcionConductorUI';
import { TitulosDeSeccionUI } from '../../components/ui/TitulosDeSeccionUI';

//Esta pagina nos muestra la informacion del usuario, en el caso de test nos muestra a todos los pedidos de la lista de pedidos

export const HistorialDePedidos = ({ user, historialDeOrdenes }) => {
  // Filtramos para obtener solo los pedidos del usuario actualmente conectado
  const pedidosHechos = historialDeOrdenes.filter(pedido => pedido.emailConductor === user?.email);

  return (
    <ScreenLayout title="Mis Pedidos" showBack>
      {/* Nos muestra las metricas del conductor actual */}
      <DescripcionConductorUI
        name={user?.name || PERFIL_CONDUCTOR.name}
        horasTrabajadas={PERFIL_CONDUCTOR.horasTrabajadas}
        numeroDeOrdenes={pedidosHechos.length}
      />
      {/* Carga el historial de pedidos que hizo el conductor especifico */}
      <TitulosDeSeccionUI title="Historial" />

      {pedidosHechos.map(pedido => (
        <CartaPedidoUI key={pedido.id} pedido={pedido} />
      ))}
    </ScreenLayout>
  );
};
