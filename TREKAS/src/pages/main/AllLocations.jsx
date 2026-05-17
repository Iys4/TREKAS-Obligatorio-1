import React from 'react';
import { ScreenLayout } from '../../components/layout/ScreenLayout';
import { Input } from '../../components/ui/Input';
import { LocationCard } from '../../components/ui/LocationCard';
import { useAllLocations } from '../../hooks/useAllLocations';

//Le mandamos desde App.jsx la informacion de los hooks y esta funcion nos devuelve una lista de locaciones filtradas, con el numero de ordenes y la funciones para hacer funcionar
//el sistema de busqueda de pedidos.
export const AllLocations = ({ ordersHistory }) => {
  const {
    search,
    setSearch,
    filteredLocations,
    getOrdersForLocation,
    navigateToLocation,
  } = useAllLocations({ ordersHistory });

  return (
    <ScreenLayout title="Todos los Locales" showBack>
      <Input 
        placeholder="Filtrar locales..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
{/* Usamos las funciones que le mandamos de useAllLocations para que nos cargue el nombre del local, la cantidad de ordenes y le decimos que pasa cuando se apreta al componente*/}
      <div className="mt-3">
        {filteredLocations.map(loc => (
          <LocationCard 
            key={loc.id}
            location={loc}
            orders={getOrdersForLocation(loc.name)}
            onClick={() => navigateToLocation(loc.name)}
          />
        ))}

        {/* Aparece esto si no hay locales con el nombre del filtro*/}
        {filteredLocations.length === 0 && (
          <p className="text-center text-muted mt-4">
            No se encontraron locales.
          </p>
        )}
      </div>
    </ScreenLayout>
  );
};
