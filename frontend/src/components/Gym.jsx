import React from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTANTE AÑADIR ESTO
import './Gym.css'; 

const Gym = ({ id, nombre, precio, localizacion, notaMedia, imagen }) => {
    const navigate = useNavigate(); // Inicializamos el hook

    return (
        <div className="gym-card">
            <div className="gym-image-wrapper" style={{ flex: '0 0 35%' }}>
                <img src={imagen} alt={nombre} />
                <div className="location-badge">{localizacion}</div>
            </div>
            
            <div className="gym-content">
                <div className="gym-header-row">
                    <h2>{nombre}</h2>
                    <div className="rating-badge">
                        <span>★</span> {notaMedia}/10
                    </div>
                </div>

                <div className="gym-details">
                    <p className="gym-price">
                        {precio}€ <span className="period">/mes</span>
                    </p>
                    <p className="gym-description">
                        Acceso completo a sala de musculación y clases colectivas.
                    </p>
                </div>

                <div className="gym-actions">
                    {/* Añadimos el evento onClick para ir a la nueva página pasándole el ID */}
                    <button className="gym-btn" onClick={() => navigate(`/gym/${id}`)}>
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gym;