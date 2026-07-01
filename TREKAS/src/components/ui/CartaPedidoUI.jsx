import React, { useState } from 'react';
import { ColorDestaqueUI } from './ColorDestaqueUI';

/**
 * Convierte un timestamp a texto relativo ("Hace 5 min", "Hace 2 h", etc.)
 */
const getRelativeTime = (createdAt, dateStr) => {
  const date = createdAt ? new Date(createdAt) : new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;

  if (isNaN(diffMs) || diffMs < 0) return dateStr;

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Hace instantes';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  return `Hace ${diffDays} d`;
};

/**
 * Tarjeta de un pedido individual en el historial.
 * Muestra local, dirección, estado, items y metadatos secundarios.
 *
 * Si se pasa `onConfirmarEntrega`, el pedido es activo y muestra
 * un botón "✓ Entregado" con modal de confirmación (usado en DetalleDeLocal).
 *
 * Nota: Los pedidos se guardan en /api/compras por restricción del backend.
 *
 * @param {{ pedido: object, onConfirmarEntrega?: function }} props
 */
export const CartaPedidoUI = ({ pedido, onConfirmarEntrega }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);

  const isEnCamino = pedido.status === 'EN CAMINO';
  const tiempoRelativo = getRelativeTime(pedido.createdAt, pedido.date);

  const handleConfirmar = async () => {
    if (!onConfirmarEntrega) return;
    setCargando(true);
    try {
      await onConfirmarEntrega(pedido.id);
    } catch {
      // error ya loggeado en el hook
    } finally {
      setCargando(false);
      setMostrarModal(false);
    }
  };

  return (
    <>
      <div
        className="card"
        style={{ borderLeft: `5px solid ${isEnCamino ? '#0ea5e9' : 'var(--primary)'}` }}
      >
        {/* ── Fila superior: nombre del local + badge de estado ── */}
        <div className="flex-between mb-1">
          <h3 className="m-0" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {pedido.location || 'Local desconocido'}
          </h3>
          <ColorDestaqueUI
            text={isEnCamino ? 'EN CAMINO' : 'ENTREGADO'}
            color={isEnCamino ? 'blue' : 'orange'}
          />
        </div>

        {/* ── Dirección del local (si está disponible) ── */}
        {pedido.direccion && (
          <p className="text-sm text-muted mb-2" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📍</span> {pedido.direccion}
          </p>
        )}

        {/* ── Lista de ítems del pedido ── */}
        <div className="pedido-items-list mb-2">
          <p className="text-xs-bold mb-1" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Productos
          </p>
          {pedido.items.map((item, idx) => {
            const tienePrecio = item.precio && item.precio > 0;
            const subtotal = tienePrecio ? item.precio * item.cantidad : null;
            return (
              <div key={idx} className="item-row">
                <span style={{ fontWeight: 500 }}>
                  {item.name}
                  {tienePrecio && (
                    <span className="text-xs text-muted" style={{ marginLeft: '6px', fontWeight: 400, fontSize: '0.75rem' }}>
                      (${item.precio} c/u)
                    </span>
                  )}
                </span>
                <span className="text-bold" style={{ color: 'var(--text-main)' }}>
                  ×{item.cantidad} {tienePrecio && `($${subtotal})`}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Fila inferior: metadatos + botón de entrega ── */}
        <div className="flex-between" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '4px', gap: '8px' }}>
          <div>
            <span className="text-sm text-muted">
              {isEnCamino ? tiempoRelativo : pedido.date}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
              Total: <strong style={{ color: 'var(--text-main)' }}>${pedido.total}</strong>
            </span>
          </div>

          {/* Botón de confirmar entrega — solo para pedidos EN CAMINO con handler */}
          {isEnCamino && onConfirmarEntrega && (
            <button
              onClick={() => setMostrarModal(true)}
              style={{
                background: '#dcfce7',
                color: '#166534',
                border: 'none',
                borderRadius: '20px',
                padding: '5px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#bbf7d0'}
              onMouseOut={e => e.currentTarget.style.background = '#dcfce7'}
            >
              Marcar como entregado
            </button>
          )}
        </div>
      </div>

      {/* ── Modal de confirmación ── */}
      {mostrarModal && (
        <div
          onClick={() => setMostrarModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '28px 24px',
              maxWidth: '340px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📦</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 700 }}>
              ¿Confirmar entrega?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.4 }}>
              Estás por marcar el pedido de{' '}
              <strong>{pedido.location}</strong> como entregado.
              <br />Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '28px',
                  border: '2px solid #e2e8f0', background: 'transparent',
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={cargando}
                style={{
                  flex: 1, padding: '12px', borderRadius: '28px',
                  border: 'none',
                  background: cargando ? '#94a3b8' : '#22c55e',
                  color: '#fff', fontWeight: 700,
                  cursor: cargando ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem', transition: 'background 0.2s',
                }}
              >
                {cargando ? 'Guardando...' : '✓ Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
