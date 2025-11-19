import React from 'react';
// No importamos './Gym.css' aquí si ya lo importamos en el padre, 
// pero si prefieres mantenerlo modular, déjalo.

const Gym = ({ id, nombre, precio, localizacion, notaMedia, imagen }) => {
    return (
        <div className="gym-card">
            <div className="gym-image-wrapper">
                <img src={imagen} alt={nombre} />
                {/* Etiqueta flotante sobre la imagen */}
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
                    <button className="gym-btn">Ver Detalles</button>
                </div>
            </div>
        </div>
    )
}
export default Gym;