import { apiFetch } from './api';

/**
 * Servicio para operaciones sobre pedidos (endpoint: /api/compras).
 *
 * NOTA: el backend expone los pedidos bajo /api/compras por una
 * restricción de nomenclatura del backend, pero en la app
 * representan PEDIDOS de entrega, no compras.
 */

/**
 * Marca un pedido como ENTREGADO via PUT /api/compras/:id.
 * Envía el objeto data del pedido con status, activo y ACTIVO actualizados.
 *
 * @param {object} pedido - El pedido del estado local (historialDeOrdenes).
 */
export const marcarPedidoEntregado = async (pedido) => {
  return apiFetch(`/api/compras/${pedido.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        location: pedido.location,
        status: 'ENTREGADO',
        emailConductor: pedido.emailConductor,
        activo: false,
        ACTIVO: false,
        date: pedido.date,
        localId: pedido.localId || null,
        direccion: pedido.direccion || null,
      },
    }),
  });
};
