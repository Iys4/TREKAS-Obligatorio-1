import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarCompras = async () => {
    try {
      const respuesta = await apiFetch("/api/compras");
      setCompras(respuesta.items || []);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  const realizarCompra = async () => {
    try {
      const compra = {
        items: [
          {
            productoId: "producto-demo-1",
            cantidad: 2,
            data: {
              nombre: "Hamburguesa demo",
              precio: 350,
            },
          },
        ],
        total: 700,
        datosCheckout: {
          nombre: "Cliente de prueba",
          email: "cliente@test.com",
          direccion: "Montevideo",
          telefono: "099123456",
        },
      };

      const respuesta = await apiFetch("/api/compras", {
        method: "POST",
        body: JSON.stringify(compra),
      });

      setMensaje(respuesta.message || "Compra realizada");
      cargarCompras();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const obtenerCompraPorId = async (id) => {
    try {
      const respuesta = await apiFetch(`/api/compras/${id}`);
      setCompraSeleccionada(respuesta);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Compras</h1>
      <p>Esta pantalla usa POST /api/compras, GET /api/compras y GET /api/compras/:id.</p>

      {mensaje && <p className="message">{mensaje}</p>}

      <button onClick={realizarCompra}>Realizar compra de prueba</button>

      <h2>Historial</h2>
      {compras.map((compra) => (
        <div className="card" key={compra.id}>
          <h3>Compra #{compra.id}</h3>
          <p>Total: ${compra.total}</p>
          <p>Fecha: {compra.createdAt}</p>
          <button onClick={() => obtenerCompraPorId(compra.id)}>Ver detalle</button>
        </div>
      ))}

      {compraSeleccionada && (
        <section className="card destacado">
          <h2>Detalle de compra</h2>
          <p>ID: {compraSeleccionada.id}</p>
          <p>Total: ${compraSeleccionada.total}</p>
          <h3>Productos</h3>
          {compraSeleccionada.items.map((item) => (
            <p key={item.productoId}>
              {item.data?.nombre} - Cantidad: {item.cantidad}
            </p>
          ))}
        </section>
      )}
    </div>
  );
};

export default Compras;
