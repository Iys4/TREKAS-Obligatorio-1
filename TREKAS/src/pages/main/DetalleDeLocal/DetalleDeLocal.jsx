import React from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { CartaPedidoUI } from '../../../components/ui/CartaPedidoUI';
import { CartaLocalUI } from '../../../components/ui/CartaLocalUI';
import { usarDetalleDeLocal } from './usarDetalleDeLocal';

export const DetalleDeLocal = ({ historialDeOrdenes }) => {
  const {
    nombreDeLocal,
    infoDeLocal,
    pedidosDeLocal,
  } = usarDetalleDeLocal({ historialDeOrdenes });

  return (
    <ScreenLayout title="Detalle del Local" showBack>
      {/* Banner con la info del local, el nombre y la direccion */}
      <CartaLocalUI
        infoDeLocal={infoDeLocal}
        fallbackName={nombreDeLocal}
      />

      {/* Encabezado de historial */}
      <TitulosDeSeccionUI title={`Historial de Pedidos (${pedidosDeLocal.length})`} className="mb-3 text-lg" />

      {/* Si hay items en el array de pedidosDeLocal los lee todos y los muestra en un CartaPedidoUI. Con todos los datos necesarios*/}
      {pedidosDeLocal.length > 0 ? (
        pedidosDeLocal.map(pedido => (
          <CartaPedidoUI key={pedido.id} pedido={pedido} />
        ))
      ) : (
        <p className="text-center text-muted mt-4">
          Este local aún no tiene pedidos realizados.
        </p>
      )}
    </ScreenLayout>
  );
};
