import React from 'react';
import { ScreenLayout } from '../../../components/layout/ScreenLayout';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { FormatoCartaUI } from '../../../components/ui/FormatoCartaUI';
import { ItemCheckoutUI } from '../../../components/ui/ItemCheckoutUI';
import { EstructuraCheckoutUI } from '../../../components/ui/EstructuraCheckoutUI';
import { usarResumenDePedidos } from './usarResumenDePedidos';

// Esta es la pagina donde vemos el resumen del pedido
// Le manda los props que recibe de App.jsx a usarResumenDePedidos que procesa la info
export const VerPedidos = ({ carrito, total, localSeleccionado, confirmarOrden }) => {
  const {
    isEmpty,
    confirmadorDePedidos,
    irAtrasResumenDePedidos,
  } = usarResumenDePedidos({ confirmarOrden, carrito, localSeleccionado });

  // Handle de que pasa si el carrito esta vacio, en teoria no deberia pasar porque no podes avanzar a esta pagina con el carrito vacio
  if (isEmpty) {
    return (
      <ScreenLayout title="Resumen" showBack>
        <div className="text-center">
          <p>No hay productos en el carrito o no se seleccionó un local.</p>
          <BotonPrincipalUI title="VOLVER" onClick={irAtrasResumenDePedidos} />
        </div>
      </ScreenLayout>
    );
  }

  // La parte visual del sistema
  return (
    <ScreenLayout
      title="Resumen de Pedido"
      showBack
      onBack={irAtrasResumenDePedidos}
      footer={
        <div className="footer-action">
          <BotonPrincipalUI title="CONFIRMAR PEDIDO" onClick={confirmadorDePedidos} />
        </div>
      }
    >
      <FormatoCartaUI title="Destino" titleClassName="text-primary mb-1">
        <p className="text-lg text-bold">{localSeleccionado.name}</p>
        <p className="text-muted">{localSeleccionado.address}</p>
      </FormatoCartaUI>

      <FormatoCartaUI title="Productos">
        {carrito.map(item => (
          <ItemCheckoutUI
            key={item.producto.id}
            name={item.producto.name}
            cantidad={item.cantidad}
            precio={item.producto.precio}
          />
        ))}
        <EstructuraCheckoutUI total={total} />
      </FormatoCartaUI>
    </ScreenLayout>
  );
};
