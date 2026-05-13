<<<<<<< Updated upstream
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState } from 'react';
>>>>>>> Stashed changes
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { LOCATIONS } from '../../mockData';

export const AllLocations = ({ ordersHistory }) => {
  const [search, setSearch] = useState('');
  const nav = useNavigate();

  const filteredLocations = LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.address.toLowerCase().includes(search.toLowerCase())
  );

  const getOrdersForLocation = (locationName) => {
    return ordersHistory.filter(order => order.location === locationName);
  };

  return (
    <div className="flex-col-full">
      <Header title="Todos los Locales" showBack />
      
      <div className="screen-container">
        <Input 
          placeholder="Filtrar locales..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-3">
          {filteredLocations.map(loc => {
            const orders = getOrdersForLocation(loc.name);
            const hasOrders = orders.length > 0;

            return (
              <div 
                key={loc.id} 
                onClick={() => nav(`/locations/${encodeURIComponent(loc.name)}`)}
                className="card-interactive"
                style={{ borderLeft: hasOrders ? '6px solid #4CAF50' : '1px solid #ddd' }}
              >
                <div className="flex-between">
                  <h3 className="m-0">{loc.name}</h3>
                  {hasOrders && (
                    <span className="badge badge-green">
                      {orders.length} PEDIDO(S)
                    </span>
                  )}
                </div>
                <p className="text-muted text-sm mt-2" style={{ marginTop: '4px' }}>{loc.address}</p>
                
                {hasOrders && (
                  <div className="mt-2 pt-2" style={{ borderTop: '1px dotted #eee', paddingTop: '12px' }}>
                    <p className="text-xs-bold mb-1" style={{ color: '#666' }}>ÚLTIMOS PEDIDOS:</p>
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} className="item-row">
                        <span>{order.date}</span>
                        <span className="text-bold">${order.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredLocations.length === 0 && (
            <p className="text-center text-muted mt-4">
              No se encontraron locales.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
