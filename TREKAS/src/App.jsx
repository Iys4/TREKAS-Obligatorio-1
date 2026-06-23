import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import imgOriginal from './assets/Original.png';
import imgChia from './assets/OriginalSinChia.png';
import imgHorneadas from './assets/Horneadas.png';

function App() {
<<<<<<< Updated upstream
=======
  //Este es el hook que se inicializa cuando comienza la app, le dice a la app QUIEN esta logeado
  //Llama a enviarAuth que es la funcion que nos devuelve el usuario
  //Se llama al inicio porque es un componente con memoria, luego le envia esta memoria a los componentes
  //que vamos a usar despues y precisan la info de quien es el usuario y los contenidos del carrito.
  //Tambien le envia la funcionalidad a los botones login y logout que estan definidos dentro.
  const {
    user,
    login,
    logout,
    register,
    updateUserName
  } = enviarAuth();

  // Hook de la ubicacion, guarda a que local vamos a entregar en la pantalla de agregar pedido
  //Empieza valiendo null
  //
  const { localSeleccionado, establecerLocacion } = hookLocacion();

  // Hook del carrito, agrega y borra items del carrito usando los otros el hook de usarPedidosNuevos, con memoria
  const { carrito, agregarItem, limpiarCarrito, total } = usarCarrito(user, localSeleccionado);

  const [locales, setLocales] = useState([]);

  useEffect(() => {
    if (user) {
      apiFetch("/api/locales")
        .then(res => {
          const fetched = (res.items || []).map(item => ({
            id: item.data?.id || item.id,
            name: item.data?.name || item.data?.nombre || '',
            address: item.data?.address || item.data?.direccion || '',
            coordenadas: item.data?.coordenadas || [],
          }));
          setLocales(fetched);
        })
        .catch(err => console.error("Error fetching locales:", err));
    } else {
      setLocales([]);
    }
  }, [user]);

  // Hook de pedidos, crea nuevos pedidos y los guarda en el historial del tipo del delivery
  const { historialDeOrdenes, confirmarOrden } = usarPedidosNuevos({ user, carrito, localSeleccionado, total, limpiarCarrito });

  // Filtramos los pedidos activos (activo === true) para pasarlos al mapa en Home
  // Asi los pedidos nuevos confirmados tambien aparecen automaticamente en el mapa
  const pedidosActivos = historialDeOrdenes.filter(p => p.activo === true);

>>>>>>> Stashed changes
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="TREKAS Logo" className="logo" />
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>NUESTRO PLAN<br/>RICO Y SALUDABLE</h1>
          <button className="btn-white">Ver Productos</button>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="Nachos Trekas" className="hero-image" />
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">¡PROBALOS TODOS!</h2>
        
        <div className="products-grid">
          {/* Card 1 */}
          <div className="product-card">
            <img src={imgOriginal} alt="Receta Original" className="product-image" />
            <h3>Receta Original</h3>
            <button className="btn-white">Comprar</button>
          </div>

          {/* Card 2 */}
          <div className="product-card">
            <img src={imgChia} alt="Nachos con chia" className="product-image" />
            <h3>Nachos con chia</h3>
            <button className="btn-white">Comprar</button>
          </div>

          {/* Card 3 */}
          <div className="product-card">
            <img src={imgHorneadas} alt="Galletas horneadas" className="product-image" />
            <h3>Galletas horneadas</h3>
            <button className="btn-white">Comprar</button>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="recipes-section">
        <div className="recipes-placeholder"></div>
        <div className="recipes-content">
          <h4 className="recipes-subtitle">Recetas para tus planes</h4>
          <h2 className="recipes-title">Ricos y<br/>Saludables</h2>
          <p className="recipes-desc">
            Te preparamos recetas pensadas para disfrutar de tus Trekas de una forma sana y rica
          </p>
          <button className="btn-yellow">Ver recetas</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2>Encontranos en los<br/>supermercados</h2>
        <button className="btn-white">Entrar al sistema</button>
      </footer>
    </div>
  );
}

export default App;
