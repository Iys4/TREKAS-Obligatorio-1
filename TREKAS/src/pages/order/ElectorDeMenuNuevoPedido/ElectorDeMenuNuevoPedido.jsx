import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeleccionarLocalPaso1 } from '../../../components/order/SeleccionarLocalPaso1';
import { SeleccionarProductoPaso2 } from '../../../components/order/SeleccionarProductoPaso2';

//Este es el controlador de los pasos para crear un nuevo pedido
//Lo llama app.jsx cuando queremos hacer un nuevo pedido, ahi el "step" vale 1, que significa que tenemos que enviar un local.
//Cuando le damos un local lo carga en la memoria y avanza de step al step 2.
//El step 2 nos pide que le digamos cual es el producto y cuanto producto queremos pedir.

export const ElectorDeMenuNuevoPedido = ({ localSeleccionado, establecerLocacion, carrito, agregarItem }) => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  if (step === 1) {
    return (
      <SeleccionarLocalPaso1
        localSeleccionado={localSeleccionado}
        establecerLocacion={establecerLocacion}
        onNext={() => setStep(2)}
      />
    );
  }

  return (
    <SeleccionarProductoPaso2
      carrito={carrito}
      agregarItem={agregarItem}
      onNext={() => nav('/pedido/summary')}
      onBack={() => setStep(1)}
    />
  );
};
