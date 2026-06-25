import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

/**
 * Hook para obtener la lista de locales desde la API.
 * Se ejecuta cada vez que el componente que lo usa se monta,
 * garantizando datos frescos al entrar a cada pantalla.
 * @param {object|null} user - Usuario autenticado. Si es null, no hace fetch.
 * @returns {{ locales: Array, cargandoLocales: boolean }}
 */
export const usarLocales = (user) => {
  const [locales, setLocales] = useState([]);
  const [cargandoLocales, setCargandoLocales] = useState(false);

  useEffect(() => {
    if (!user) {
      setLocales([]);
      return;
    }

    setCargandoLocales(true);
    apiFetch('/api/locales')
      .then(res => {
        const fetched = (res.items || []).map(item => ({
          id: item.data?.id || item.id,
          name: item.data?.name || item.data?.nombre || '',
          address: item.data?.address || item.data?.direccion || '',
          coordenadas: item.data?.coordenadas || [],
        }));
        setLocales(fetched);
      })
      .catch(err => console.error('Error fetching locales:', err))
      .finally(() => setCargandoLocales(false));
  }, [user]);

  return { locales, cargandoLocales };
};
