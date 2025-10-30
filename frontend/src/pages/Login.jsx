import React, { createContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(email == ""){
      alert("pon un email");
      return; 
    }
    if(password == ""){
      alert("pon una contrasñea");
      return;
    }
    const usuarioData = {
      email:email , 
      contrasena: password
    }

    try{
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(usuarioData)

      });
      const data = await response.json()
      if (data.success) {
        alert('Registro exitoso');
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/')
       
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo conectar con el servidor');
    }

    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Iniciar Sesión</button>
        </form>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  )
}

export default Login
