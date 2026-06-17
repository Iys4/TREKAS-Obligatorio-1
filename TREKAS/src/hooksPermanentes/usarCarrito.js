import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

// En esta funcion se guardan los datos que tienen que ver con el carrito
// Hook que maneja unicamente el carrito de productos y el total
export const usarCarrito = (user, localSeleccionado) => {
  // guarda el carrito en un use state para que no se borre
  const [carrito, enviarNuevoCarrito] = useState([]);

  // Cargar el carrito desde la API al iniciar sesión o cambiar de usuario
  useEffect(() => {
    if (user) {
      apiFetch("/api/carrito")
        .then(res => {
          const apiItems = res.items || [];
          const frontendItems = apiItems.map(item => ({
            producto: {
              id: item.productoId,
              name: item.data?.nombre || item.data?.name || '',
              precio: Number(item.data?.precio || 0),
              description: item.data?.descripcion || item.data?.description || '',
              image: item.data?.image || item.data?.imagen || null,
              localId: item.data?.localId || null,
            },
            cantidad: Number(item.cantidad || 0)
          }));
          enviarNuevoCarrito(frontendItems);
        })
        .catch(err => {
          console.error("Error cargando el carrito desde la API:", err);
          enviarNuevoCarrito([]);
        });
    } else {
      enviarNuevoCarrito([]);
    }
  }, [user]);

  // Vacia todos los productos del carrito, sirve cuando se confirma el pedido y borramos la memoria,
  // porque al ser un hook tiene memoria esta funcion
  const limpiarCarrito = async () => {
    enviarNuevoCarrito([]);
    try {
      await apiFetch("/api/carrito", {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error vaciando el carrito en la API:", err);
    }
  };

  // Limpiar el carrito si cambia de local y el carrito actual pertenece a otro local diferente
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

  // Si el producto ya esta en el carrito actualiza su cantidad; si no, lo agrega
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

    // Actualizamos el estado local agregando el localId al producto si no lo tiene
    const nuevoCarritoConLocal = nuevoCarrito.map(item => ({
      ...item,
      producto: {
        ...item.producto,
        localId: item.producto.localId || localSeleccionado?.id || null
      }
    }));

    enviarNuevoCarrito(nuevoCarritoConLocal);

    // Sincronizamos con la API mediante PUT
    try {
      const itemsPayload = nuevoCarritoConLocal.map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
        data: {
          nombre: item.producto.name,
          precio: item.producto.precio,
          descripcion: item.producto.description,
          imagen: item.producto.image || null,
          localId: item.producto.localId || localSeleccionado?.id || null
        }
      }));

      await apiFetch("/api/carrito", {
        method: "PUT",
        body: JSON.stringify({ items: itemsPayload })
      });
    } catch (err) {
      console.error("Error sincronizando carrito en la API:", err);
    }
  };


  // Sumamos los precios y se los mandamos al return
  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return {
    carrito,
    agregarItem,
    limpiarCarrito,
    total,
  };
};
