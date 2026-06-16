import React from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { InputUI } from '../../../components/ui/InputUI';
import { CartaDeLocalUI } from '../../../components/ui/CartaDeLocalUI';
import { usarListaLocales } from './usarListaLocales';

// Componente que muestra todos los locales a los que entregamos mercadería.
// Permite buscar por nombre/dirección y muestra la cantidad de pedidos históricos de cada uno.
export const TodosLosLocales = ({ historialDeOrdenes, locales = [] }) => {
  const {
    search,
    actualizarInput,
    localesFiltrados,
    getOrdersForLocation,
    verDetalleDeLocal,
  } = usarListaLocales({ historialDeOrdenes, locales });

  return (
    <ScreenLayout title="Todos los Locales" showBack>
      <InputUI
        placeholder="Filtrar locales..."
        value={search}
        onChange={(e) => actualizarInput(e.target.value)}
      />

      <div className="mt-3">
        {localesFiltrados.map(loc => (
          <CartaDeLocalUI
            key={loc.id}
            location={loc}
            pedidos={getOrdersForLocation(loc.name)}
            onClick={() => verDetalleDeLocal(loc.name)}
          />
        ))}

        {/* Mensaje amigable si la búsqueda no arroja resultados */}
        {localesFiltrados.length === 0 && (
          <p className="text-center text-muted mt-4">
            No se encontraron locales.
          </p>
        )}
      </div>
    </ScreenLayout>
  );
};
