import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './GymDetails.css';

const GymDetails = () => {
  const { id } = useParams(); // Pillamos el ID de la URL
  const navigate = useNavigate();

  // Simulamos los datos extendidos que vendrían de tu base de datos
  const mockDatabase = {
    1: { nombre: "Sinnergym", precio: 25, localizacion: "Txantrea", notaMedia: 8, imagen: "/assets/sinerGym.jpg", horario: "L-V: 06:00 - 23:00, S-D: 08:00 - 15:00", equipamiento: ["Peso libre", "Máquinas guiadas", "Zona funcional", "Cardio"], descripcion: "El mejor gimnasio del barrio con maquinaria renovada en 2023. Ambiente enfocado al entrenamiento de fuerza.", comentarios: [{ user: "Carlos", nota: 5, texto: "Instalaciones de 10." }, { user: "Ana", nota: 4, texto: "A veces hay mucha gente a las 19:00." }] },
    2: { nombre: "Vivagym", precio: 40, localizacion: "Morea", notaMedia: 8, imagen: "/vivagym.jpg", horario: "L-D: 06:00 - 00:00", equipamiento: ["Piscina", "Clases dirigidas", "Sauna"], descripcion: "Centro deportivo premium para toda la familia.", comentarios: [{ user: "Mikel", nota: 5, texto: "La piscina es una gozada." }] },
    // Añade el resto de IDs aquí para que no rompa si pinchas en otro
  };

  const gym = mockDatabase[id];

  if (!gym) return <div className="gyms-page"><h2 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Gimnasio no encontrado</h2></div>;

  return (
    <div className="gyms-page">
      <Navbar />
      
      <div className="details-container">
        {/* Botón de volver */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Volver a Gimnasios
        </button>

        {/* Cabecera Principal */}
        <div className="details-header">
          <img src={gym.imagen} alt={gym.nombre} className="details-hero-img" />
          <div className="details-title-box">
            <h1>{gym.nombre}</h1>
            <div className="badges-row">
              <span className="location-badge details-badge">📍 {gym.localizacion}</span>
              <span className="rating-badge details-badge">★ {gym.notaMedia}/10</span>
            </div>
          </div>
        </div>

        {/* Grid de Información */}
        <div className="details-grid">
          {/* Columna Izquierda: Info */}
          <div className="details-info-card">
            <h2>Información General</h2>
            <p className="gym-price" style={{ marginBottom: '1rem' }}>{gym.precio}€ <span className="period">/mes</span></p>
            <p className="details-text">{gym.descripcion}</p>
            
            <h3 className="section-subtitle">Horario</h3>
            <p className="details-text">🕒 {gym.horario}</p>

            <h3 className="section-subtitle">Equipamiento</h3>
            <div className="tags-container">
              {gym.equipamiento?.map((item, index) => (
                <span key={index} className="gyms-badge" style={{ display: 'inline-block', margin: '4px' }}>{item}</span>
              ))}
            </div>

            <button className="gym-btn" style={{ width: '100%', marginTop: '2rem' }}>Inscribirse Ahora</button>
          </div>

          {/* Columna Derecha: Comentarios */}
          <div className="details-comments-card">
            <h2>Comentarios de Usuarios</h2>
            {gym.comentarios && gym.comentarios.length > 0 ? (
              <div className="comments-list">
                {gym.comentarios.map((comentario, index) => (
                  <div key={index} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">{comentario.user}</span>
                      <span className="rating-badge" style={{ padding: '2px 6px', fontSize: '0.8rem' }}>★ {comentario.nota}</span>
                    </div>
                    <p className="comment-text">"{comentario.texto}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="details-text">Aún no hay comentarios para este gimnasio.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GymDetails;