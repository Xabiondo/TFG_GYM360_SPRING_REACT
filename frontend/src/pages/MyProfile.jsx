import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GymCalendar from "../components/GymCalendar";
// Asegúrate de que GymCalendar acepte estilos o se adapte al contenedor

const MyProfile = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recuperamos al usuario del localStorage
    const userData = localStorage.getItem("user"); // O 'usuario_gym360' según como lo hayas guardado en el login
    if (userData) {
      try {
        const datosJson = JSON.parse(userData);
        // A veces el objeto usuario está dentro de una propiedad 'user' o 'data', ajusta según tu backend
        // Aquí asumo que datosJson ya tiene las propiedades
        setUsuario(datosJson);
      } catch (e) {
        console.error("Error parseando usuario", e);
      }
    }
  }, []);

  if (!usuario) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="content-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h1 className="section-header">Inicia sesión para ver tus datos</h1>
          <a href="/login" className="action-btn" style={{ display: 'inline-block', width: 'auto' }}>Ir al Login</a>
        </div>
      </div>
    );
  }


  const inicial = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U";

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="offers-container">
        <header className="offers-header">
          <h1>MI <span className="text-gradient">PERFIL</span></h1>
          <p>Gestiona tu cuenta y revisa tu actividad.</p>
        </header>

        {/* Usamos una clase específica para distribuir el perfil (Grid 1/3 - 2/3) */}
        <div className="profile-grid">
          
          {/* --- TARJETA DE USUARIO --- */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-circle">{inicial}</div>
              <span className="user-role">Miembro Gym360</span>
            </div>
            
            <div className="profile-info">
              <h2>{usuario.nombre}</h2>
              <p className="user-email">{usuario.email}</p>
              
              <div className="stats-row">
                <div className="stat">
                  <span className="stat-val">0</span>
                  <span className="stat-label">Puntos</span>
                </div>
                <div className="stat">
                  <span className="stat-val">Active</span>
                  <span className="stat-label">Estado</span>
                </div>
              </div>
            </div>

            <button className="action-btn secondary-btn">Editar Perfil</button>
          </div>

          {/* --- SECCIÓN CALENDARIO --- */}
          <div className="calendar-container-card">
            <div className="card-header-row">
              <h3>Tu Actividad</h3>
              <span className="badge-info">Mensual</span>
            </div>
            <div className="calendar-wrapper">
               <GymCalendar />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;