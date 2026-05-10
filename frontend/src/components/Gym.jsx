import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gym.css';



const Gym = ({ placeId, nombre, direccion, puntuacion, totalResenas, fotoReferencia }) => {
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:8080";

    const urlImagen = fotoReferencia
        ? `${API_BASE_URL}${fotoReferencia}`
        : 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/case-studies/optimum-gym-business-case-image-list-4.jpg?itok=vh4fpxDF';

    return (
        <div className="gym-card">
            <div className="gym-image-wrapper" style={{ flex: '0 0 35%' }}>
                <img src={urlImagen} alt={nombre} />
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
                         {direccion}
                    </p>
                    <p className="gym-description">
                       Haz click para más detalles
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