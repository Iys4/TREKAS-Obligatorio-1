import { useState, useEffect } from 'react';
import { fetchCart, saveCart, clearCart } from '../services/cart';

/**
 * Hook para manejar el carrito de compras.
 * @param {object|null} user - Información del usuario autenticado.
 * @param {object|null} localSeleccionado - Local actualmente seleccionado.
 * @returns {{carrito: Array, agregarItem: Function, limpiarCarrito: Function, total: number}}
 */
export const usarCarrito = (user, localSeleccionado) => {
  const [carrito, setCarrito] = useState([]);

  const enviarNuevoCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
  };

  // Carga el carrito desde la API cuando el usuario está autenticado
  // Dependemos de id/email para no recargar si se actualiza solo el nombre
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const frontendItems = await fetchCart();
          enviarNuevoCarrito(frontendItems);
        } catch (err) {
          console.error("Error loading cart from API:", err);
          enviarNuevoCarrito([]);
        }
      } else {
        enviarNuevoCarrito([]);
      }
    };
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!user]);

  // Vacía el carrito tanto en el estado local como en la API
  const limpiarCarrito = async () => {
    enviarNuevoCarrito([]);
    try {
      await clearCart();
    } catch (err) {
      console.error("Error clearing cart in API:", err);
    }
  };

  // Si se cambia de local y el carrito contiene productos de otro local, lo limpiamos
  useEffect(() => {
    if (localSeleccionado && carrito.length > 0) {
      const tieneProductosDeOtroLocal = carrito.some(
        item => item.producto.localId && item.producto.localId !== localSeleccionado.id
      );
      if (tieneProductosDeOtroLocal) {
        limpiarCarrito();
      }
    }
  }, [localSeleccionado, carrito]);

  // Añade un producto en el carrito y lo sincroniza con la API
  const agregarItem = async (producto, cantidad) => {
    const existing = carrito.find(item => item.producto.id === producto.id);
    let nuevoCarrito;
    if (existing) {
      nuevoCarrito = carrito.map(item =>
        item.producto.id === producto.id ? { ...item, cantidad } : item
      );
    } else {
      nuevoCarrito = [...carrito, { producto, cantidad }];
    }

    // Aseguramos que cada producto tenga el localId correcto
    const nuevoCarritoConLocal = nuevoCarrito.map(item => ({
      ...item,
      producto: {
        ...item.producto,
        localId: item.producto.localId || localSeleccionado?.id || null,
      },
    }));

    enviarNuevoCarrito(nuevoCarritoConLocal);

    try {
      await saveCart(nuevoCarritoConLocal);
    } catch (err) {
      console.error("Error synchronizing cart in API:", err);
    }
  };

  // Suma total de precios
  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return { carrito, agregarItem, limpiarCarrito, total };
};
