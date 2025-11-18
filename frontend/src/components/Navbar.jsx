import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import {useAuth} from '../context/AuthContext.jsx'

const Navbar = () => {

  const {user} = useAuth();
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
            {user ? (<Link to="/logout">Cerrar Sesión</Link>):null }
          </li>

        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
           <Link to="/my-profile">
        <img src='./assets/doctor.png' alt="User" width={40} />
        </Link>  ) :(
          <Link to="/login" className="login-button">
            Iniciar Sesión
          </Link>
        )}
       
      </div>
    </nav>
  );
};

export default Navbar;
