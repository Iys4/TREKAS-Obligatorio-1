import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

// Combina los pedidos activos y concretados para tener el historial completo al inicio
export const usarPedidosNuevos = ({ user, carrito, localSeleccionado, total, limpiarCarrito }) => {
  const [historialDeOrdenes, cambiarHistorialDeOrdenes] = useState([]);

  const cargarPedidos = async () => {
    try {
      const respuesta = await apiFetch("/api/compras");
      const items = respuesta.items || [];

      if (items.length === 0) {
        cambiarHistorialDeOrdenes([]);
        return;
      }

      const list = items.map(item => {
        const status = item.data?.status || (item.data?.activo || item.data?.ACTIVO ? 'EN CAMINO' : 'ENTREGADO');
        const activo = item.data?.activo !== undefined 
          ? item.data.activo 
          : (item.data?.ACTIVO !== undefined 
             ? item.data.ACTIVO 
             : (status === 'EN CAMINO'));

        return {
          id: item.id,
          date: item.data?.date || item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          createdAt: item.createdAt,
          total: item.total,
          status,
          activo,
          ACTIVO: activo,
          location: item.data?.location || item.datosCheckout?.direccion || 'Desconocido',
          emailConductor: item.data?.emailConductor || item.datosCheckout?.email || 'repartir@gmail.com',
          items: (item.items || []).map(i => ({
            name: i.data?.nombre || i.data?.name || 'Producto',
            cantidad: i.cantidad
          }))
        };
      });

      // Ordenar por fecha descendente
      list.sort((a, b) => b.date.localeCompare(a.date));
      cambiarHistorialDeOrdenes(list);
    } catch (error) {
      console.error("Error al cargar pedidos de la API:", error);
      cambiarHistorialDeOrdenes([]);
    }
  };

  useEffect(() => {
    if (user) {
      cargarPedidos();
    } else {
      cambiarHistorialDeOrdenes([]);
    }
  }, [user]);

  // Crea un nuevo pedido con los datos actuales y lo agrega al historial
  const confirmarOrden = async () => {
    if (!localSeleccionado || carrito.length === 0) return;

    try {
      const body = {
        items: carrito.map(item => ({
          productoId: item.producto.id.split('-')[0],
          cantidad: item.cantidad,
          data: {
            nombre: item.producto.name,
            precio: item.producto.precio,
          }
        })),
        total,
        datosCheckout: {
          nombre: user?.name || 'Conductor',
          email: user?.email || 'repartir@gmail.com',
          direccion: localSeleccionado.address || localSeleccionado.name,
        },
        data: {
          location: localSeleccionado.name,
          status: 'EN CAMINO',
          emailConductor: user?.email || 'repartir@gmail.com',
          activo: true,
          ACTIVO: true,
          date: new Date().toISOString().split('T')[0],
        }
      };

      console.log("confirmarOrden body:", JSON.stringify(body, null, 2));

      const respuesta = await apiFetch("/api/compras", {
        method: "POST",
        body: JSON.stringify(body)
      });

      const newOrder = {
        id: respuesta.compra?.id || respuesta.id,
        date: body.data.date,
        createdAt: respuesta.compra?.createdAt || respuesta.createdAt || new Date().toISOString(),
        total: body.total,
        status: body.data.status,
        activo: body.data.activo,
        ACTIVO: body.data.ACTIVO,
        location: body.data.location,
        emailConductor: body.data.emailConductor,
        items: body.items.map(i => ({
          name: i.data.nombre,
          cantidad: i.cantidad
        }))
      };

      // Agrega el nuevo pedido al inicio del historial
      cambiarHistorialDeOrdenes(prev => [newOrder, ...prev]);
      // Vacia el carrito y la ubicacion seleccionada
      limpiarCarrito();
    } catch (error) {
      console.error("Error al confirmar la orden en la API:", error);
      throw error;
    }
  };

  return {
    historialDeOrdenes,
    confirmarOrden,
  };
};
