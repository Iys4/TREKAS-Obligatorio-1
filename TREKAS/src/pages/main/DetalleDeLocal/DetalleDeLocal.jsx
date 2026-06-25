import React from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { TitulosDeSeccionUI } from '../../../components/ui/TitulosDeSeccionUI';
import { CartaPedidoUI } from '../../../components/ui/CartaPedidoUI';
import { DetalleLocalCardUI } from '../../../components/ui/DetalleLocalCardUI';
import { usarDetalleDeLocal } from './usarDetalleDeLocal';
import { usarLocales } from '../../../hooks/usarLocales';

/**
 * Pantalla de detalle de un local.
 * Muestra TODOS los pedidos del local (tanto EN CAMINO como ENTREGADOS).
 * También permite confirmar entregas de pedidos aún activos desde esta vista.
 */
export const DetalleDeLocal = ({ historialDeOrdenes, user, marcarEntregado }) => {
  const { locales, cargandoLocales } = usarLocales(user);
  const {
    nombreDeLocal,
    infoDeLocal,
    pedidosDeLocal,
  } = usarDetalleDeLocal({ historialDeOrdenes, locales });

  const activosCount = pedidosDeLocal.filter(p => p.activo).length;
  const totalCount = pedidosDeLocal.length;

  return (
    <ScreenLayout title="Detalle del Local" showBack>
      {cargandoLocales ? (
        <p className="text-center text-muted mt-4">
          Cargando información del local...
        </p>
      ) : (
        <>
          {/* Banner con la info del local, el nombre y la dirección */}
          <DetalleLocalCardUI
            infoDeLocal={infoDeLocal}
            fallbackName={nombreDeLocal}
          />

          {/* Encabezado con conteo de pedidos */}
          <TitulosDeSeccionUI
            title={`Historial de Pedidos (${totalCount}${activosCount > 0 ? ` — ${activosCount} en camino` : ''})`}
            className="mb-3 text-lg"
          />

          {/* Lista completa: activos primero, luego entregados */}
          {pedidosDeLocal.length > 0 ? (
            [...pedidosDeLocal]
              .sort((a, b) => {
                // Activos primero
                if (a.activo && !b.activo) return -1;
                if (!a.activo && b.activo) return 1;
                return 0;
              })
              .map(pedido => (
                <CartaPedidoUI
                  key={pedido.id}
                  pedido={pedido}
                  onConfirmarEntrega={pedido.activo ? marcarEntregado : null}
                />
              ))
          ) : (
            <p className="text-center text-muted mt-4">
              Este local aún no tiene pedidos realizados.
            </p>
          )}
        </>
      )}
    </ScreenLayout>
  );
};
