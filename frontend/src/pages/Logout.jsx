import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className='page-wrapper'>
      <div className='offers-container'>
        <header className='offers-header'>
          <h1>¿Seguro que quieres cerrar sesión?</h1>


          <button className='auth-button' onClick={handleLogout}>
            Sí, cerrar sesión
          </button>


          <button
            className='auth-button'
            onClick={handleCancel}

          >
            Cancelar
          </button>
        </header>
      </div>
    </div>
  )
}