import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { marcarPedidoEntregado } from '../services/orders';

/**
 * Hook que gestiona el historial de pedidos del conductor.
 *
 * NOTA sobre el endpoint: los pedidos se persisten en /api/compras.
 * Este nombre es una restricción del backend y no refleja la
 * semántica de la app (son PEDIDOS de entrega, no compras).
 */
export const usarPedidosNuevos = ({ user }) => {
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
          // location = nombre del local
          location: item.data?.location || item.datosCheckout?.direccion || 'Desconocido',
          // direccion = dirección física del local (guardada en datosCheckout.direccion)
          direccion: item.datosCheckout?.direccion || item.data?.direccion || null,
          emailConductor: item.data?.emailConductor || item.datosCheckout?.email || 'repartir@gmail.com',
          items: (item.items || []).map(i => ({
            name: i.data?.nombre || i.data?.name || 'Producto',
            cantidad: Number(i.cantidad || 0),
            precio: Number(i.data?.precio || 0)
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
  const confirmarOrden = async ({ carrito = [], localSeleccionado = null, total = 0, limpiarCarrito = () => {} } = {}) => {
    if (!localSeleccionado || carrito.length === 0) return;

    try {
        const body = {
          items: carrito.map(item => ({
            productoId: item.producto.id,
            cantidad: item.cantidad,
            data: {
              nombre: item.producto.name,
              precio: item.producto.precio,
              descripcion: item.producto.description || '',
              imagen: item.producto.image || null,
              localId: item.producto.localId || localSeleccionado?.id || null
            }
          })),
          total,
          datosCheckout: {
            nombre: user?.name || 'Conductor',
            email: user?.email || 'repartir@gmail.com',
            direccion: localSeleccionado?.address || localSeleccionado?.name || ''
          },
          data: {
            location: localSeleccionado?.name || '',
            status: 'EN CAMINO',
            emailConductor: user?.email || 'repartir@gmail.com',
            activo: true,
            ACTIVO: true,
            date: new Date().toISOString().split('T')[0],
            localId: localSeleccionado?.id || null
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
        direccion: body.datosCheckout.direccion,
        emailConductor: body.data.emailConductor,
        items: body.items.map(i => ({
          name: i.data.nombre,
          cantidad: i.cantidad,
          precio: Number(i.data.precio || 0)
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

  /**
   * Marca un pedido como ENTREGADO en la API y actualiza el estado local.
   * Los pedidos entregados dejan de ser "activos" y desaparecen
   * del listado principal de locales con pedidos en camino.
   */
  const marcarEntregado = async (pedidoId) => {
    const pedido = historialDeOrdenes.find(p => p.id === pedidoId);
    if (!pedido) return;
    try {
      await marcarPedidoEntregado(pedido);
      // Actualizamos el estado local sin recargar desde la API
      cambiarHistorialDeOrdenes(prev =>
        prev.map(p =>
          p.id === pedidoId
            ? { ...p, status: 'ENTREGADO', activo: false, ACTIVO: false }
            : p
        )
      );
    } catch (err) {
      console.error('Error marcando pedido como entregado:', err);
      throw err;
    }
  };

  return {
    historialDeOrdenes,
    confirmarOrden,
    marcarEntregado,
  };
};
