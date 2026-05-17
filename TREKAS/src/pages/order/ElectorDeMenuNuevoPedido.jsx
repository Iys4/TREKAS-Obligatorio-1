import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectLocationStep } from '../../components/order/SelectLocationStep';
import { SelectProductsStep } from '../../components/order/SelectProductsStep';

//Este es el controlador de los pasos para crear un nuevo pedido
//Lo llama app.jsx cuando queremos hacer un nuevo pedido, ahi el "step" vale 1, que significa que tenemos que enviar un local.
//Cuando le damos un local lo carga en la memoria y avanza de step al step 2.
//El step 2 nos pide que le digamos cual es el producto y cuanto producto queremos pedir.

export const ElectorDeMenuNuevoPedido = ({ selectedLocation, establecerLocacion, cart, agregarItem }) => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  if (step === 1) {
    return (
      <SelectLocationStep
        selectedLocation={selectedLocation}
        establecerLocacion={establecerLocacion}
        onNext={() => setStep(2)}
      />
    );
  }

  return (
    <SelectProductsStep
      cart={cart}
      agregarItem={agregarItem}
      onNext={() => nav('/order/summary')}
      onBack={() => setStep(1)}
    />
  );
};

