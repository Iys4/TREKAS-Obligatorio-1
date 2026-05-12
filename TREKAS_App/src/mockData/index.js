export const PRODUCTS = [
  {
    id: 1,
    name: "TREKAS Tradicional",
    description: "Galletas tostadas clásicas, ideales para cualquier momento.",
    price: 120,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=TRADICIONAL"
  },
  {
    id: 2,
    name: "TREKAS Chía",
    description: "Con semillas de chía, fuente de omega 3 y fibra.",
    price: 135,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=CHIA"
  },
  {
    id: 3,
    name: "TREKAS Horneadas",
    description: "Elaboradas al horno, sin frituras, extra crujientes.",
    price: 130,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=HORNEADAS"
  }
];

export const LOCATIONS = [
  { id: 1, name: "Kiosco El Sol", address: "Av. Siempre Viva 123" },
  { id: 2, name: "Supermercado Día", address: "Calle Falsa 456" },
  { id: 3, name: "Minimarket Centro", address: "Plaza Principal s/n" }
];

export const DRIVER_PROFILE = {
  name: "Juan Pérez",
  hoursWorked: 32,
  deliveriesCount: 14,
  history: [
    { id: 'ORD-001', date: '2026-05-10', total: 4800, status: 'ENTREGADO', location: 'Kiosco El Sol' },
    { id: 'ORD-002', date: '2026-05-11', total: 6500, status: 'ENTREGADO', location: 'Supermercado Día' }
  ]
};

export const MOCK_CREDENTIALS = {
  email: "repartidor@trekas.com",
  password: "password123"
};