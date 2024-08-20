import React from 'react';
import './header.css'; // Asegúrate de tener un archivo CSS con este nombre

function Header() {
  return (
    <header>
      <h1>Mi Aplicación React</h1>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/acerca-de">Acerca de</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;