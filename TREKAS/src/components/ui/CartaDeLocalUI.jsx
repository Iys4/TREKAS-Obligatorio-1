import React, { useState } from 'react';
import { ColorDestaqueUI } from './ColorDestaqueUI';

/**
 * Tarjeta de local en la lista de "Ver Pedidos en Camino".
 *
 * Props:
 *  - location: { id, name, address }
 *  - pedidos: pedidos activos (EN CAMINO) del local
 *  - selected: si está seleccionado en el flujo de nuevo pedido
 *  - onClick: navega al detalle del local
 *  - onConfirmarEntrega(pedidoId): marca un pedido como ENTREGADO
 */
export const CartaDeLocalUI = ({ location, pedidos = [], selected = false, isClosest = false, onClick, onConfirmarEntrega }) => {
  // ID del pedido pendiente de confirmar (abre el modal)
  const [pedidoAConfirmar, setPedidoAConfirmar] = useState(null);
  const [cargando, setCargando] = useState(false);

  const hasOrders = pedidos.length > 0;

  let borderLeftStyle = '1px solid #ddd';
  if (selected) {
    borderLeftStyle = '6px solid var(--primary)';
  } else if (hasOrders) {
    borderLeftStyle = '6px solid #0ea5e9';
  }

  const handleConfirmar = async () => {
    if (!pedidoAConfirmar || !onConfirmarEntrega) return;
    setCargando(true);
    try {
      await onConfirmarEntrega(pedidoAConfirmar.id);
    } catch {
      // El error ya se loggea en el hook; no bloqueamos la UI
    } finally {
      setCargando(false);
      setPedidoAConfirmar(null);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`card-interactive ${selected ? 'selected' : ''}`}
        style={{ borderLeft: borderLeftStyle, transition: 'all 0.2s ease-in-out' }}
      >
        {/* Fila superior: nombre + badge */}
        <div className="flex-between">
          <h3
            className="m-0"
            style={{ color: selected ? 'var(--primary)' : 'var(--text-main)', transition: 'color 0.2s ease' }}
          >
            {location.name}
          </h3>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {isClosest && <ColorDestaqueUI text="MÁS CERCANO" color="green" />}
            {hasOrders && <ColorDestaqueUI text={`${pedidos.length} EN CAMINO`} color="blue" />}
          </div>
        </div>

        {/* Dirección */}
        <p className="text-muted text-sm mt-2" style={{ marginTop: '6px' }}>
          {location.address}
        </p>

        {/* Pedidos activos con botón de confirmar entrega */}
        {!selected && hasOrders && (
          <div className="mt-2 pt-2" style={{ borderTop: '1px dotted #e2e8f0', paddingTop: '12px' }}>
            <p className="text-xs-bold mb-1" style={{ color: '#64748b' }}>PEDIDOS EN CAMINO:</p>
            {pedidos.map(pedido => (
              <div
                key={pedido.id}
                className="item-row"
                style={{ alignItems: 'center', marginBottom: '8px' }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.85rem' }}>{pedido.date}</span>
                  <span className="text-bold" style={{ marginLeft: '8px', fontSize: '0.85rem' }}>
                    ${pedido.total}
                  </span>
                </div>
                {/* Evitamos que el click del botón propague al onClick de la carta (que navega) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPedidoAConfirmar(pedido);
                  }}
                  style={{
                    background: '#dcfce7',
                    color: '#166534',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#bbf7d0'}
                  onMouseOut={e => e.currentTarget.style.background = '#dcfce7'}
                >
                  Marcar como entregado
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {pedidoAConfirmar && (
        <div
          onClick={() => setPedidoAConfirmar(null)}
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
            {/* Ícono */}
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📦</div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 700 }}>
              ¿Confirmar entrega?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.4 }}>
              Estás por marcar el pedido de{' '}
              <strong>{location.name}</strong> como entregado.
              <br />Esta acción no se puede deshacer.
            </p>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setPedidoAConfirmar(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '28px',
                  border: '2px solid #e2e8f0',
                  background: 'transparent',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={cargando}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '28px',
                  border: 'none',
                  background: cargando ? '#94a3b8' : '#22c55e',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: cargando ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
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
