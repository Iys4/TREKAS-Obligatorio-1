import React, { useState, useContext } from 'react';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { LOCATIONS } from '../../mockData';
import { CartContext } from '../../context/CartContext';

export const AllLocations = () => {
  const { ordersHistory } = useContext(CartContext);
  const [search, setSearch] = useState('');

  const filteredLocations = LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  const getOrdersForLocation = (locationName) => {
    return ordersHistory.filter(order => order.location === locationName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header title="Todos los Locales" showBack />
      
      <div className="screen-container">
        <Input 
          placeholder="Filtrar locales..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ marginTop: '16px' }}>
          {filteredLocations.map(loc => {
            const orders = getOrdersForLocation(loc.name);
            const hasOrders = orders.length > 0;

            return (
              <div key={loc.id} style={{ 
                background: 'white', 
                padding: '16px', 
                borderRadius: '8px', 
                marginBottom: '16px', 
                border: '1px solid #ddd',
                borderLeft: hasOrders ? '6px solid #4CAF50' : '1px solid #ddd'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>{loc.name}</h3>
                  {hasOrders && (
                    <span style={{ 
                      background: '#E8F5E9', 
                      color: '#2E7D32', 
                      fontSize: '0.7rem', 
                      fontWeight: 'bold', 
                      padding: '4px 8px', 
                      borderRadius: '4px' 
                    }}>
                      {orders.length} PEDIDO(S)
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{loc.address}</p>
                
                {hasOrders && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dotted #eee' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>ÚLTIMOS PEDIDOS:</p>
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>{order.date}</span>
                        <span style={{ fontWeight: 'bold' }}>${order.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredLocations.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '24px' }}>
              No se encontraron locales.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
