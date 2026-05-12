export const PRODUCTS = [
  { id: 1, name: "TREKAS Tradicional", description: "Clásicas tostadas", price: 120, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=TRADICIONAL" },
  { id: 2, name: "TREKAS Chía", description: "Con semillas de chía", price: 135, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=CHIA" },
  { id: 3, name: "TREKAS Horneadas", description: "Extra crujientes", price: 130, image: "https://via.placeholder.com/150/E65100/FFFFFF?text=HORNEADAS" }
];
export const LOCATIONS = [
  { id: 1, name: "Kiosco El Sol", address: "Av. Siempre Viva 123" },
  { id: 2, name: "Supermercado Día", address: "Calle Falsa 456" }
];
export const DRIVER_PROFILE = {
  name: "Juan Pérez", hoursWorked: 32, deliveriesCount: 14,
  history: [{ id: 'ORD-001', date: '2026-05-10', total: 4800, status: 'ENTREGADO', location: 'Kiosco El Sol' }]
};
export const MOCK_CREDENTIALS = { email: "repartidor@trekas.com", password: "password123" };