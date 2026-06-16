import imgOriginal from '../assets/img/productos/original.png';
import imgChia from '../assets/img/productos/chia.png';
import imgGalletas from '../assets/img/productos/galletas.png';

export const PRODUCTS = [
  { id: 1, name: "TREKAS Tradicional", description: "Clásicas tostadas", precio: 900, image: imgOriginal },
  { id: 2, name: "TREKAS Chía", description: "Con semillas de chía", precio: 900, image: imgChia },
  { id: 3, name: "TREKAS Horneadas", description: "Extra crujientes", precio: 900, image: imgGalletas }
];

// Coordenadas en el centro de Montevideo (Plaza Independencia y alrededores)
export const LOCALES = [
  { id: 1, name: "Kiosco El Sol",        address: "18 de Julio 1234",      coordenadas: [-34.9058, -56.1883] },
  { id: 2, name: "Supermercado Día",     address: "Sarandí 456, Ciudad Vieja", coordenadas: [-34.9075, -56.2012] },
  { id: 3, name: "Farmacia Central",     address: "Av. 18 de Julio 890",   coordenadas: [-34.9025, -56.1925] },
  { id: 4, name: "Almacén Don Pedro",    address: "Carlos Gardel 123",     coordenadas: [-34.9085, -56.1855] },
  { id: 5, name: "Minimarket Rambla",    address: "Rambla Rep. de Chile 44", coordenadas: [-34.9038, -56.1750] },
];

// Perfil base de un conductor, se puede usar para agregar conductores en el futuro
export const PERFIL_CONDUCTOR = {
  name: "Juan Pérez",
  horasTrabajadas: 32,
  deliveriesCount: 14,
};

// Pedidos que están en camino actualmente — el mapa los usa para colorear los locales
export const PEDIDOS_ACTIVOS = [
  {
    id: 'ORD-A01',
    date: '2026-05-26',
    total: 5400,
    status: 'EN CAMINO',
    activo: true,
    ACTIVO: true,
    location: 'Kiosco El Sol',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Tradicional', cantidad: 30 },
      { name: 'TREKAS Chía', cantidad: 30 },
    ],
  },
  {
    id: 'ORD-A02',
    date: '2026-05-26',
    total: 2700,
    status: 'EN CAMINO',
    activo: true,
    ACTIVO: true,
    location: 'Farmacia Central',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Horneadas', cantidad: 30 },
    ],
  },
  {
    id: 'ORD-A03',
    date: '2026-05-25',
    total: 1800,
    status: 'EN CAMINO',
    activo: true,
    ACTIVO: true,
    location: 'Minimarket Rambla',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Chía', cantidad: 20 },
    ],
  },
];

// Pedidos que ya fueron entregados
export const PEDIDOS_CONCRETADOS = [
  {
    id: 'ORD-C01',
    date: '2026-05-10',
    total: 4800,
    status: 'ENTREGADO',
    activo: false,
    ACTIVO: false,
    location: 'Kiosco El Sol',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Tradicional', cantidad: 20 },
      { name: 'TREKAS Chía', cantidad: 15 },
    ],
  },
  {
    id: 'ORD-C02',
    date: '2026-05-12',
    total: 2700,
    status: 'ENTREGADO',
    activo: false,
    ACTIVO: false,
    location: 'Supermercado Día',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Horneadas', cantidad: 30 },
    ],
  },
  {
    id: 'ORD-C03',
    date: '2026-05-18',
    total: 3600,
    status: 'ENTREGADO',
    activo: false,
    ACTIVO: false,
    location: 'Almacén Don Pedro',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Tradicional', cantidad: 25 },
      { name: 'TREKAS Chía', cantidad: 15 },
    ],
  },
  {
    id: 'ORD-C04',
    date: '2026-05-20',
    total: 1800,
    status: 'ENTREGADO',
    activo: false,
    ACTIVO: false,
    location: 'Farmacia Central',
    emailConductor: 'repartir@gmail.com',
    items: [
      { name: 'TREKAS Horneadas', cantidad: 20 },
    ],
  },
];

export const MOCK_CREDENTIALS = { email: "repartir@gmail.com", contraseña: "repartir" };

