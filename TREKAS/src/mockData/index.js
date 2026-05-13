export const PRODUCTS = [
  { id: 1, name: "TREKAS Tradicional", description: "Clásicas tostadas", price: 900, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=TRADICIONAL" },
  { id: 2, name: "TREKAS Chía", description: "Con semillas de chía", price: 900, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=CHIA" },
  { id: 3, name: "TREKAS Horneadas", description: "Extra crujientes", price: 900, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=HORNEADAS" }
];
export const LOCATIONS = [
  { id: 1, name: "Kiosco El Sol", address: "Av. Siempre Viva 123" },
  { id: 2, name: "Supermercado Día", address: "Calle Falsa 456" }
];
export const DRIVER_PROFILE = {
  name: "Juan Pérez", hoursWorked: 32, deliveriesCount: 14,
  history: [
    { 
      id: 'ORD-001', 
      date: '2026-05-10', 
      total: 4800, 
      status: 'ENTREGADO', 
      location: 'Kiosco El Sol',
      items: [
        { name: 'TREKAS Tradicional', quantity: 20 },
        { name: 'TREKAS Chía', quantity: 15 }
      ]
    },
    { 
      id: 'ORD-002', 
      date: '2026-05-12', 
      total: 2700, 
      status: 'EN CAMINO', 
      location: 'Supermercado Día',
      items: [
        { name: 'TREKAS Horneadas', quantity: 30 }
      ]
    }
  ]
};
export const MOCK_CREDENTIALS = { email: "repartidor@trekas.com", password: "password123" };