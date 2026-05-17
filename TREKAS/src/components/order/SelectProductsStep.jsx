import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Input } from '../ui/Input';
import { PRODUCTS } from '../../mockData';

//Este componente es donde ingresamos los items que queremos pedir.

//Cart, es el carrito que toma de la memoria
//agregarItem, funcion que agrega o elimina items del carrito
//onNext, la funcion del boton CONTINUAR
//onBack, la funcion del boton VOLVER, que envia el contador en NewOrder para atras 
export const SelectProductsStep = ({ cart, agregarItem, onNext, onBack }) => {


  const [search, setSearch] = useState('');

  //getQ es una funcion que lee cuantas de una id tiene el carrito
  const getQ = id => cart.find(i => i.product.id === id)?.quantity || 0;

  //Filtro para buscar el producto en nuestra lista de productos para luego renderizarlos, ahora mismo no tiene mucho uso porque solo hay 3 productos pero si agregamos mas productos va a ser util
  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-col-full">
      <Header title="Productos" showBack onBack={onBack} />
      <div className="screen-container">
        <Input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredProducts.map(p => (
          <div key={p.id} className="card flex-between mb-2">
            <div>
              <h3 className="m-0">{p.name}</h3><p className="text-primary text-bold m-0">${p.price}</p>
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
        <PrimaryButton title="CONTINUAR" disabled={cart.length === 0} onClick={onNext} />
      </div>
    </div>
  );
};
