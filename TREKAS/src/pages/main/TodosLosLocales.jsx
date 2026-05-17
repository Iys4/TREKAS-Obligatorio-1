import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { InputUI } from '../../components/ui/InputUI';
import { CartaDeLocalUI } from '../../components/ui/CartaDeLocalUI';
import { LOCALES } from '../../mockData';

// Componente que muestra todos los locales a los que entregamos mercadería.
// Permite buscar por nombre/dirección y muestra la cantidad de pedidos históricos de cada uno.
export const TodosLosLocales = ({ historialDeOrdenes }) => {
  const [search, actualizarInput] = useState('');
  const nav = useNavigate();

  // Filtramos la lista de locales de forma reactiva a la búsqueda
  const localesFiltrados = LOCALES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  // Cargamos los pedidos correspondientes a cada local
  const cargarOrdenesParaLocal = (nombreDeLocal) => {
    return historialDeOrdenes.filter(order => order.location === nombreDeLocal);
  };

  // Navega al detalle de pedidos de un local específico
  const verDetalleDeLocal = (nombreDeLocal) => {
    nav(`/locations/${encodeURIComponent(nombreDeLocal)}`);
  };

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
            pedidos={cargarOrdenesParaLocal(loc.name)}
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
