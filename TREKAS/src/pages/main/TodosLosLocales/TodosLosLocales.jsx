import React from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { InputUI } from '../../../components/ui/InputUI';
import { CartaDeLocalUI } from '../../../components/ui/CartaDeLocalUI';
import { usarListaLocales } from './usarListaLocales';
import { usarLocales } from '../../../hooks/usarLocales';

/**
 * Pantalla principal de locales / pedidos en camino.
 * Muestra los locales ordenados: primero los que tienen pedidos EN CAMINO,
 * luego el resto. Permite confirmar entregas directamente desde aquí.
 */
export const TodosLosLocales = ({ historialDeOrdenes, user, marcarEntregado }) => {
  const { locales, cargandoLocales } = usarLocales(user);
  const {
    search,
    actualizarInput,
    localesOrdenados,
    getPedidosActivosParaLocal,
    verDetalleDeLocal,
  } = usarListaLocales({ historialDeOrdenes, locales });

  return (
    <ScreenLayout title="Ver Pedidos Activos" showBack>
      <InputUI
        placeholder="Filtrar locales..."
        value={search}
        onChange={(e) => actualizarInput(e.target.value)}
      />

      <div className="mt-3">
        {cargandoLocales ? (
          <p className="text-center text-muted mt-4">
            Cargando locales...
          </p>
        ) : (
          <>
            {localesOrdenados.map(loc => (
              <CartaDeLocalUI
                key={loc.id}
                location={loc}
                pedidos={getPedidosActivosParaLocal(loc.name)}
                onClick={() => verDetalleDeLocal(loc.name)}
                onConfirmarEntrega={marcarEntregado}
              />
            ))}

            {localesOrdenados.length === 0 && (
              <p className="text-center text-muted mt-4">
                No se encontraron locales.
              </p>
            )}
          </>
        )}
      </div>
    </ScreenLayout>
  );
};
