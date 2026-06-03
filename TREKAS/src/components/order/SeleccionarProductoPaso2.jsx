import React, { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { BotonPrincipalUI } from '../ui/BotonPrincipalUI';
import { InputUI } from '../ui/InputUI';
import { apiFetch } from '../../services/api';

//Este componente es donde ingresamos los items que queremos pedir.

//carrito, es el carrito que toma de la memoria
//agregarItem, funcion que agrega o elimina items del carrito
//onNext, la funcion del boton CONTINUAR
//onBack, la funcion del boton VOLVER, que envia el contador en NewOrder para atras 
export const SeleccionarProductoPaso2 = ({ carrito, agregarItem, onNext, onBack }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, actualizarInput] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const respuesta = await apiFetch("/api/productos");
        
        // Adaptamos el formato de la API (id y data) al formato interno de la app (id, name, description, precio, image)
        const adaptados = (respuesta.items || []).map(p => ({
          id: p.id,
          name: `${p.data.nombre} (API)`, // (API) agregado al nombre para confirmar el origen
          description: p.data.descripcion,
          precio: p.data.precio,
          image: p.data.imagen
        }));
        setProductos(adaptados);
      } catch (err) {
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  //getQ es una funcion que lee cuantas de una id tiene el carrito
  const getQ = id => carrito.find(i => i.producto.id === id)?.cantidad || 0;

  //Filtro para buscar el producto en nuestra lista de productos para luego renderizarlos
  const filteredProducts = productos.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-col-full">
      <Header title="Productos" showBack onBack={onBack} />
      <div className="screen-container">
        {/* Indicador visual de origen de datos */}
        <div style={{ 
          padding: '8px 12px', 
          marginBottom: '12px', 
          borderRadius: '8px', 
          fontSize: '13px', 
          fontWeight: '600', 
          background: '#d4edda', 
          color: '#155724', 
          textAlign: 'center', 
          border: '1px solid #c3e6cb' 
        }}>
          🟢 Cargando productos en tiempo real desde la API
        </div>

        <InputUI
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => actualizarInput(e.target.value)}
        />

        {loading && <p className="text-center text-muted">Cargando productos de la API...</p>}
        {error && <p className="text-center text-danger" style={{ color: '#721c24' }}>{error}</p>}

        {!loading && !error && filteredProducts.map(p => (
          <div key={p.id} className="card flex-between mb-2">
            <img src={p.image} alt={p.name} className='item-image' />
            <div>
              <h3 className="m-0">{p.name}</h3><p className="text-primary text-bold m-0">${p.precio}</p>
            </div>
            <div className="flex-row-gap">
              <button className="btn-stepper" onClick={() => getQ(p.id) > 0 && agregarItem(p, getQ(p.id) - 1)}>-</button>
              <span className="text-xl text-bold">{getQ(p.id)}</span>
              <button className="btn-stepper" onClick={() => agregarItem(p, getQ(p.id) + 1)}>+</button>
            </div>
          </div>
        ))}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-muted">No se encontraron productos.</p>
        )}
      </div>
      <div className="footer-action">
        {/* Si el carrito esta vacio no te deja avanzar*/}
        <BotonPrincipalUI title="CONTINUAR" disabled={carrito.length === 0} onClick={onNext} />
      </div>
    </div>
  );
};
