import { PROJECT_KEY } from "../services/api";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="container">
      <h1>Demo API Obligatorio 2</h1>
      <p>Usuario logueado: {user?.email}</p>
      <p>Grupo hardcodeado: {PROJECT_KEY}</p>

      <section className="card">
        <h2>Qué muestra este proyecto</h2>
        <ul>
          <li>Login y registro contra API</li>
          <li>Token guardado en localStorage</li>
          <li>Rutas protegidas</li>
          <li>CRUD completo de productos</li>
          <li>Carrito</li>
          <li>Checkout / compras</li>
          <li>Perfil de usuario</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
