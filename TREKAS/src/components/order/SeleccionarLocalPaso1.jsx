import React, { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { BotonPrincipalUI } from '../ui/BotonPrincipalUI';
import { InputUI } from '../ui/InputUI';
import { CartaDeLocalUI } from '../ui/CartaDeLocalUI';

// Haversine formula to calculate distance in km between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

//localSeleccionado Recibe el location guardado en la memoria (generalmente deberia ser null)
//establecerLocacion es el componente que guarda el location en la memoria
//onNext, cuando se apreta CONTINUAR sube el step en NewOrder.jsx

export const SeleccionarLocalPaso1 = ({ locales = [], localSeleccionado, establecerLocacion, onNext }) => {
  const [search, actualizarInput] = useState('');
  const [coords, setCoords] = useState(null);

  // Obtiene la ubicación del conductor al montar el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación en Selección de Local:", error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Filtro de búsqueda usando locales
  const localesFiltrados = locales.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  // Mapeamos los locales con su respectiva distancia si hay coordenadas
  const localesConDistancia = localesFiltrados.map(l => {
    if (coords && l.coordenadas && l.coordenadas.length === 2) {
      const dist = getDistance(
        coords.latitude,
        coords.longitude,
        l.coordenadas[0],
        l.coordenadas[1]
      );
      return { ...l, distancia: dist };
    }
    return { ...l, distancia: Infinity };
  });

  // Ordenamos los locales: menor distancia primero
  if (coords) {
    localesConDistancia.sort((a, b) => a.distancia - b.distancia);
  }

  // Identificamos el ID del local que esté más cerca del conductor
  const closestLocalId = coords
    ? localesConDistancia.reduce((closest, current) => {
        if (current.distancia < closest.distancia) {
          return current;
        }
        return closest;
      }, { id: null, distancia: Infinity }).id
    : null;

  // Estructura visual
  return (
    <div className="flex-col-full">
      <Header title="Local" showBack />
      <div className="screen-container">
        <InputUI
          placeholder="Buscar location..."
          value={search}
          onChange={(e) => actualizarInput(e.target.value)}
        />

        {/* Recorre toda la lista basada en localesConDistancia y los carga dinámicamente */}
        {localesConDistancia.map(l => (
          <CartaDeLocalUI
            key={l.id}
            location={l}
            selected={localSeleccionado?.id === l.id}
            isClosest={l.id === closestLocalId}
            onClick={() => establecerLocacion(l)}
          />
        ))}

        {/* Si no se encontró ningún location muestra esto */}
        {localesConDistancia.length === 0 && (
          <p className="text-center text-muted">No se encontraron locales.</p>
        )}
      </div>

      {/* Si localSeleccionado está en Null no te deja avanzar */}
      <div className="footer-action">
        <BotonPrincipalUI title="CONTINUAR" disabled={!localSeleccionado} onClick={onNext} />
      </div>
    </div>
  );
};
