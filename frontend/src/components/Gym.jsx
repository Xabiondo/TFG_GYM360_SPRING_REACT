import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Gym.css'; 



const Gym = ({ placeId, nombre, direccion, puntuacion, totalResenas, abiertoAhora, fotoReferencia }) => {
    const navigate = useNavigate(); 
    return (
        <div className="gym-card">
            <div className="gym-image-wrapper" style={{ flex: '0 0 35%' }}>
                <img src={fotoReferencia} alt={nombre} />

                <div className={`status-badge ${abiertoAhora ? 'open' : 'closed'}`}>
                    {abiertoAhora ? '🟢 Abierto' : '🔴 Cerrado'}
                </div>
            </div>
            
            <div className="gym-content">
                <div className="gym-header-row">
                    <h2>{nombre}</h2>
                    <div className="rating-badge">
                        <span>★</span> {puntuacion ? puntuacion.toFixed(1) : 'S/N'}/5 
                        <span className="reviews-count"> ({totalResenas || 0})</span>
                    </div>
                </div>

                <div className="gym-details">
                    <p className="gym-address">
                        📍 {direccion}
                    </p>
                    <p className="gym-description">
                        Instalación deportiva registrada. Haz clic para ver horarios, fotos extra y ubicación en el mapa.
                    </p>
                </div>

                <div className="gym-actions">
                    <button className="gym-btn" onClick={() => navigate(`/gym/${placeId}`)}>
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gym;