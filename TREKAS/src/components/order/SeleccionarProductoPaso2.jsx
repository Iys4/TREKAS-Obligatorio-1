import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { BotonPrincipalUI } from '../ui/BotonPrincipalUI';
import { InputUI } from '../ui/InputUI';
import { PRODUCTS } from '../../mockData';

//Este componente es donde ingresamos los items que queremos pedir.

//carrito, es el carrito que toma de la memoria
//agregarItem, funcion que agrega o elimina items del carrito
//onNext, la funcion del boton CONTINUAR
//onBack, la funcion del boton VOLVER, que envia el contador en NewOrder para atras 
export const SeleccionarProductoPaso2 = ({ carrito, agregarItem, onNext, onBack }) => {


  const [search, actualizarInput] = useState('');

  //getQ es una funcion que lee cuantas de una id tiene el carrito
  const getQ = id => carrito.find(i => i.producto.id === id)?.cantidad || 0;

  //Filtro para buscar el producto en nuestra lista de productos para luego renderizarlos, ahora mismo no tiene mucho uso porque solo hay 3 productos pero si agregamos mas productos va a ser util
  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-col-full">
      <Header title="Productos" showBack onBack={onBack} />
      <div className="screen-container">
        <InputUI
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => actualizarInput(e.target.value)}
        />

        {filteredProducts.map(p => (
          <div key={p.id} className="card flex-between mb-2">
            <div>
              <h3 className="m-0">{p.name}</h3><p className="text-primary text-bold m-0">${p.precio}</p>
            </div>
            <div className="flex-row-gap">
              {/* Botones para agregar o reducir numero de items en la lista en memoria. si tenes 0 no se envia la funcion, si tiene mas de 0
              cuenta la cantidad del item que hay de p.id y le resta 1. Hace lo mismo en el +
              agregarItem esta en usarCarrito.js y pide item y cantidad, item es p y cantidad es getQ(p.id)+1 o getQ(p.id)-1*/}
              <button className="btn-stepper" onClick={() => getQ(p.id) > 0 && agregarItem(p, getQ(p.id) - 1)}>-</button>
              <span className="text-xl text-bold">{getQ(p.id)}</span>
              <button className="btn-stepper" onClick={() => agregarItem(p, getQ(p.id) + 1)}>+</button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
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
