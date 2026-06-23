import { apiFetch } from './api';

// Obtiene el carrito del usuario desde la API y lo transforma al formato del frontend
export const fetchCart = async () => {
  const res = await apiFetch('/api/carrito');
  const apiItems = res.items || [];
  // Mapeamos cada item de la API a la estructura que usa el hook
  return apiItems.map(item => ({
    producto: {
      id: item.productoId,
      name: item.data?.nombre || item.data?.name || '',
      precio: Number(item.data?.precio || 0),
      description: item.data?.descripcion || item.data?.description || '',
      image: item.data?.image || item.data?.imagen || null,
      localId: item.data?.localId || null,
    },
    cantidad: Number(item.cantidad || 0),
  }));
};

// Guarda el carrito completo en la API
export const saveCart = async (items) => {
  const payload = items.map(item => ({
    productoId: item.producto.id,
    cantidad: item.cantidad,
    data: {
      nombre: item.producto.name,
      precio: item.producto.precio,
      descripcion: item.producto.description,
      imagen: item.producto.image,
      localId: item.producto.localId,
    },
  }));
  await apiFetch('/api/carrito', {
    method: 'PUT',
    body: JSON.stringify({ items: payload }),
  });
};

// Borra el carrito en la API
export const clearCart = async () => {
  await apiFetch('/api/carrito', { method: 'DELETE' });
};
