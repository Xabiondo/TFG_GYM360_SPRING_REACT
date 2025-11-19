import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Login.css'; // Importamos los nuevos estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  // Añadimos estado para feedback visual en lugar de solo alerts (opcional, pero más moderno)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      alert("Pon un email");
      return;
    }
    if (password === '') {
      alert("Pon una contraseña");
      return;
    }

    setIsLoading(true); // Activamos estado de carga

    const usuarioData = {
      email: email,
      contrasena: password
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
      });

      const data = await response.json();
      
      if (data.success) {
        login(data);
        navigate('/');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo conectar con el servidor');
    } finally {
      setIsLoading(false); // Desactivamos carga
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Pequeña marca arriba para dar contexto */}
        <div style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Gym360 System
        </div>
        
        <h2>BIENVENIDO</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <p>
          ¿No tienes cuenta? 
          <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;