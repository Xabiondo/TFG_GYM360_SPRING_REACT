import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Gym360
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/gym">Gimnasios cerca de mí</Link>
          </li>
          <li>
            <Link to="/offers">Ofertas</Link>
          </li>
          <li>
            <Link to="/personal-trainer">Entrenador personal</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/my-profile">
        <img src='./assets/doctor.png' alt="User" width={40} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
