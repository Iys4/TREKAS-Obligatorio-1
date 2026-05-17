import { useParams } from 'react-router-dom';
import { LOCATIONS } from '../mockData';

export const useLocationDetail = ({ ordersHistory = [] }) => {
  //Toma el valor despues de los parametros "Trekas/Locations/Kiosko%El%Sol" se vuelve "Kiosko%El%Sol"
  const { name } = useParams();
  
  //Toma el valor de los parametros y lo limpia (ej "Kiosko%El%Sol" se convierte en "Kiosko El Sol")
  const locationName = decodeURIComponent(name || '');
  
  // Recorre la base de datos en mockData hasta encontrar el local que buscamos
  const locationInfo = LOCATIONS.find(l => l.name === locationName);
  
  // Obtener pedidos correspondientes al local desde ordersHistory, ordersHistory es el prop traido desde App.jsx
  const locationOrders = ordersHistory.filter(order => order.location === locationName);

  //Devuelve el nombre de la locacion, la info de la locacion y un array con todos los pedidos hechos a la localidad.
  return {
    locationName,
    locationInfo,
    locationOrders,
  };
};
