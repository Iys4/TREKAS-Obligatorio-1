import { useParams } from 'react-router-dom';
export const usarDetalleDeLocal = ({ historialDeOrdenes = [], locales = [] }) => {
  //Toma el valor despues de los parametros "Trekas/Locations/Kiosko%El%Sol" se vuelve "Kiosko%El%Sol"
  const { name } = useParams();

  //Toma el valor de los parametros y lo limpia (ej "Kiosko%El%Sol" se convierte en "Kiosko El Sol")
  const nombreDeLocal = decodeURIComponent(name || '');

  // Recorre los locales hasta encontrar el local que buscamos
  const infoDeLocal = locales.find(l => l.name === nombreDeLocal);

  // Obtener pedidos correspondientes al local desde historialDeOrdenes, historialDeOrdenes es el prop traido desde App.jsx
  const pedidosDeLocal = historialDeOrdenes.filter(pedido => pedido.location === nombreDeLocal);

  //Devuelve el nombre de la locacion, la info de la locacion y un array con todos los pedidos hechos a la localidad.
  return {
    nombreDeLocal,
    infoDeLocal,
    pedidosDeLocal,
  };
};
