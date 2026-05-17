import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Input } from '../ui/Input';
import { LOCATIONS } from '../../mockData';

//selectedLocation Recibe el local guardado en la memoria (generalmente deberia ser null)
//establecerLocacion es el componente que guarda el local en la memoria
//onNext, cuando se apreta CONTINUAR sube el step en NewOrder.jsx

export const SelectLocationStep = ({ selectedLocation, establecerLocacion, onNext }) => {
  const [search, setSearch] = useState('');

  //Filtro de busqueda usando LOCATIONS en index.js
  const filteredLocations = LOCATIONS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  //Estructura visual
  return (
    <div className="flex-col-full">
      <Header title="Local" showBack />
      <div className="screen-container">
        <Input
          placeholder="Buscar local..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Recorre toda la lista basado en l y los carga dinamicamente, si el nombre e id es igual a selectedLocation le pone un cuadrado naranja*/}
        {filteredLocations.map(l => (
          <div key={l.id}
            onClick={() => establecerLocacion(l)}
            className={`card-interactive ${selectedLocation?.id === l.id ? 'selected' : ''}`}>
            <h3 className="m-0">{l.name}</h3><p>{l.address}</p>
          </div>
        ))}

        {/* Si no se encontro ningun local muestra esto */}
        {filteredLocations.length === 0 && (
          <p className="text-center text-muted">No se encontraron locales.</p>
        )}
      </div>

      {/* Si selectedLocation esta en Null no te deja avanzar*/}
      <div className="footer-action">
        <PrimaryButton title="CONTINUAR" disabled={!selectedLocation} onClick={onNext} />
      </div>
    </div>
  );
};
