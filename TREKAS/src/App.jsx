import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import imgOriginal from './assets/Original.png';
import imgChia from './assets/OriginalSinChia.png';
import imgHorneadas from './assets/Horneadas.png';

function App() {
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
