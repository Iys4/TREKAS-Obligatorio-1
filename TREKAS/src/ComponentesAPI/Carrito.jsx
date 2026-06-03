import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const Carrito = () => {
  const [carrito, setCarrito] = useState({ items: [] });
  const [mensaje, setMensaje] = useState("");

  const cargarCarrito = async () => {
    try {
      const respuesta = await apiFetch("/api/carrito");
      setCarrito(respuesta);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const guardarCarritoDePrueba = async () => {
    try {
      const carritoDemo = {
        items: [
          {
            productoId: "producto-demo-1",
            cantidad: 2,
            data: {
              nombre: "Hamburguesa demo",
              precio: 350,
            },
          },
          {
            productoId: "producto-demo-2",
            cantidad: 1,
            data: {
              nombre: "Papas demo",
              precio: 220,
            },
          },
        ],
      };

      await apiFetch("/api/carrito", {
        method: "PUT",
        body: JSON.stringify(carritoDemo),
      });

      setMensaje("Carrito guardado correctamente");
      cargarCarrito();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await apiFetch("/api/carrito", {
        method: "DELETE",
      });

      setMensaje("Carrito vacío");
      cargarCarrito();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const total = (carrito.items || []).reduce((acum, item) => {
    return acum + Number(item.data?.precio || 0) * Number(item.cantidad || 0);
  }, 0);

  return (
    <div className="container">
      <h1>Carrito</h1>
      <p>Esta pantalla usa GET, PUT y DELETE de /api/carrito.</p>

      {mensaje && <p className="message">{mensaje}</p>}

      <button onClick={guardarCarritoDePrueba}>Guardar carrito de prueba</button>
      <button onClick={vaciarCarrito}>Vaciar carrito</button>

      {(carrito.items || []).map((item) => (
        <div className="card" key={item.productoId}>
          <h3>{item.data?.nombre}</h3>
          <p>Precio: ${item.data?.precio}</p>
          <p>Cantidad: {item.cantidad}</p>
          <p>Subtotal: ${Number(item.data?.precio || 0) * Number(item.cantidad || 0)}</p>
        </div>
      ))}

      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Carrito;
