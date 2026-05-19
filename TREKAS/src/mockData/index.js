import imgOriginal from '../assets/img/productos/original.png';
import imgChia from '../assets/img/productos/chia.png';
import imgGalletas from '../assets/img/productos/galletas.png';

export const PRODUCTS = [
  { id: 1, name: "TREKAS Tradicional", description: "Clásicas tostadas", precio: 900, image: imgOriginal },
  { id: 2, name: "TREKAS Chía", description: "Con semillas de chía", precio: 900, image: imgChia },
  { id: 3, name: "TREKAS Horneadas", description: "Extra crujientes", precio: 900, image: imgGalletas }
];
export const LOCALES = [
  { id: 1, name: "Kiosco El Sol", address: "Av. Siempre Viva 123" },
  { id: 2, name: "Supermercado Día", address: "Calle Falsa 456" }
];
export const PERFIL_CONDUCTOR = {
  name: "Juan Pérez", horasTrabajadas: 32, deliveriesCount: 14,
  history: [
    {
      id: 'ORD-001',
      date: '2026-05-10',
      total: 4800,
      status: 'ENTREGADO',
      location: 'Kiosco El Sol',
      emailConductor: 'repartir@gmail.com',
      items: [
        { name: 'TREKAS Tradicional', cantidad: 20 },
        { name: 'TREKAS Chía', cantidad: 15 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2026-05-12',
      total: 2700,
      status: 'EN CAMINO',
      location: 'Supermercado Día',
      emailConductor: 'repartir@gmail.com',
      items: [
        { name: 'TREKAS Horneadas', cantidad: 30 }
      ]
    }
  ]
};
export const MOCK_CREDENTIALS = { email: "repartir@gmail.com", contraseña: "repartir" };
