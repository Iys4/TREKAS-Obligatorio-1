import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("Juan Pérez");
  const [telefono, setTelefono] = useState("099123456");
  const [direccion, setDireccion] = useState("Montevideo");
  const [mensaje, setMensaje] = useState("");

  const cargarPerfil = async () => {
    try {
      const respuesta = await apiFetch("/api/usuarios/me");
      setUsuario(respuesta.user);
      setNombre(respuesta.user?.data?.nombre || "Juan Pérez");
      setTelefono(respuesta.user?.data?.telefono || "099123456");
      setDireccion(respuesta.user?.data?.direccion || "Montevideo");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const actualizarPerfil = async () => {
    try {
      const data = { nombre, telefono, direccion };

      await apiFetch("/api/usuarios/me", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      setMensaje("Perfil actualizado");
      cargarPerfil();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Perfil</h1>
      <p>Esta pantalla usa GET y PUT de /api/usuarios/me.</p>

      {mensaje && <p className="message">{mensaje}</p>}

      {usuario && (
        <section className="card">
          <p>Email: {usuario.email}</p>
          <p>ID: {usuario.id}</p>
        </section>
      )}

      <section className="card form">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <button onClick={actualizarPerfil}>Actualizar perfil</button>
      </section>
    </div>
  );
};

export default Perfil;
