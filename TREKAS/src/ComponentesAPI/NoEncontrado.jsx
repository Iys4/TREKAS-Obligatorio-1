import { Link } from "react-router";

const NoEncontrado = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p>La ruta no existe.</p>
      <Link to="/dashboard">Volver al inicio</Link>
    </div>
  );
};

export default NoEncontrado;
