import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("Hamburguesa");
  const [descripcion, setDescripcion] = useState("Hamburguesa completa");
  const [precio, setPrecio] = useState(350);
  const [imagen, setImagen] = useState("https://via.placeholder.com/150");
  const [mensaje, setMensaje] = useState("");

  const cargarProductos = async () => {
    try {
      const respuesta = await apiFetch("/api/productos");
      setProductos(respuesta.items || []);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const crearProducto = async () => {
    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        precio: Number(precio),
        imagen,
      };

      await apiFetch("/api/productos", {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
      });

      setMensaje("Producto creado correctamente");
      cargarProductos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const actualizarProducto = async (producto) => {
    try {
      const productoActualizado = {
        ...producto.data,
        nombre: producto.data.nombre + " actualizado",
      };

      await apiFetch(`/api/productos/${producto.id}`, {
        method: "PUT",
        body: JSON.stringify(productoActualizado),
      });

      setMensaje("Producto actualizado");
      cargarProductos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await apiFetch(`/api/productos/${id}`, {
        method: "DELETE",
      });

      setMensaje("Producto eliminado");
      cargarProductos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const obtenerProductoPorId = async (id) => {
    try {
      const producto = await apiFetch(`/api/productos/${id}`);
      alert("Producto obtenido por ID: " + JSON.stringify(producto.data));
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Productos</h1>
      <p>Esta pantalla usa GET, POST, PUT y DELETE de /api/productos.</p>

      {mensaje && <p className="message">{mensaje}</p>}

      <section className="card">
        <h2>Crear producto</h2>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <input value={imagen} onChange={(e) => setImagen(e.target.value)} />
        <button onClick={crearProducto}>Crear producto</button>
      </section>

      <section className="grid">
        {productos.map((producto) => (
          <article className="card" key={producto.id}>
            <img src={producto.data.imagen} alt={producto.data.nombre} />
            <h3>{producto.data.nombre}</h3>
            <p>{producto.data.descripcion}</p>
            <p>${producto.data.precio}</p>

            <button onClick={() => obtenerProductoPorId(producto.id)}>GET por ID</button>
            <button onClick={() => actualizarProducto(producto)}>PUT actualizar</button>
            <button onClick={() => eliminarProducto(producto.id)}>DELETE eliminar</button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Productos;
