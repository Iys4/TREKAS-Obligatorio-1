import React from 'react';
import { ColorDestaqueUI } from './ColorDestaqueUI';

export const CartaDeLocalUI = ({ location, pedidos = [], selected = false, onClick }) => {
  const hasOrders = pedidos.length > 0;

  // Determinar los estilos del borde izquierdo de forma limpia
  let borderLeftStyle = '1px solid #ddd';
  if (selected) {
    borderLeftStyle = '6px solid var(--primary)';
  } else if (hasOrders) {
    borderLeftStyle = '6px solid #4CAF50';
  }

  return (
    <div
      onClick={onClick}
      className={`card-interactive ${selected ? 'selected' : ''}`}
      style={{
        borderLeft: borderLeftStyle,
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <div className="flex-between">
        <h3
          className="m-0"
          style={{
            color: selected ? 'var(--primary)' : 'var(--text-main)',
            transition: 'color 0.2s ease'
          }}
        >
          {location.name}
        </h3>

        {/* Mostrar el Badge de "SELECCIONADO" si está seleccionado, sino el badge verde si tiene pedidos */}
        {selected ? (
          <ColorDestaqueUI text="SELECCIONADO" color="orange" />
        ) : (
          hasOrders && <ColorDestaqueUI text={`${pedidos.length} PEDIDO(S)`} color="green" />
        )}
      </div>

      <p className="text-muted text-sm mt-2" style={{ marginTop: '6px' }}>
        {location.address}
      </p>

      {/* Solo mostramos el historial de pedidos si NO está seleccionado y tiene pedidos */}
      {!selected && hasOrders && (
        <div className="mt-2 pt-2" style={{ borderTop: '1px dotted #eee', paddingTop: '12px' }}>
          <p className="text-xs-bold mb-1" style={{ color: '#666' }}>ÚLTIMOS PEDIDOS:</p>
          {pedidos.slice(0, 3).map(pedido => (
            <div key={pedido.id} className="item-row">
              <span>{pedido.date}</span>
              <span className="text-bold">${pedido.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
