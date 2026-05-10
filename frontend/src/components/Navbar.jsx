import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"));
  const fotoUrl = user?.fotoPerfil 
    ? `http://localhost:8080/images/user/${user.fotoPerfil}` 
    : './assets/doctor.png';

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-content">

        <div className="navbar-left">
          <Link to="/" className="logo">
            Gym360
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/progreso">Progreso</Link></li>
            <li><Link to="/gym">Gimnasios</Link></li>
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/personal-trainer">Entrenador personal</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <Link to="/my-profile">
            <img src={fotoUrl} alt="Usuario" width={40} />
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;