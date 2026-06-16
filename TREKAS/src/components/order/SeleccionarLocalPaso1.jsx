import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { BotonPrincipalUI } from '../ui/BotonPrincipalUI';
import { InputUI } from '../ui/InputUI';
import { CartaDeLocalUI } from '../ui/CartaDeLocalUI';
//localSeleccionado Recibe el location guardado en la memoria (generalmente deberia ser null)
//establecerLocacion es el componente que guarda el location en la memoria
//onNext, cuando se apreta CONTINUAR sube el step en NewOrder.jsx

export const SeleccionarLocalPaso1 = ({ locales = [], localSeleccionado, establecerLocacion, onNext }) => {
  const [search, actualizarInput] = useState('');

  //Filtro de busqueda usando locales
  const localesFiltrados = locales.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  //Estructura visual
  return (
    <div className="flex-col-full">
      <Header title="Local" showBack />
      <div className="screen-container">
        <InputUI
          placeholder="Buscar location..."
          value={search}
          onChange={(e) => actualizarInput(e.target.value)}
        />

        {/* Recorre toda la lista basado en l y los carga dinamicamente usando el componente CartaDeLocalUI unificado */}
        {localesFiltrados.map(l => (
          <CartaDeLocalUI
            key={l.id}
            location={l}
            selected={localSeleccionado?.id === l.id}
            onClick={() => establecerLocacion(l)}
          />
        ))}

        {/* Si no se encontro ningun location muestra esto */}
        {localesFiltrados.length === 0 && (
          <p className="text-center text-muted">No se encontraron locales.</p>
        )}
      </div>

      {/* Si localSeleccionado esta en Null no te deja avanzar*/}
      <div className="footer-action">
        <BotonPrincipalUI title="CONTINUAR" disabled={!localSeleccionado} onClick={onNext} />
      </div>
    </div>
  );
};
