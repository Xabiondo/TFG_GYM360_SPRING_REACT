
import React from 'react';
import './Gym.css';

const Gym = ({ id, nombre, precio, localizacion, notaMedia, imagen }) => {

    return (
        <div className="gym-card">
            <div className="gym-image">
                <img src={imagen} alt={nombre} />
            </div>
            <div className="gym-features">
                <h1>{nombre}</h1>
                <p>Precio: {precio}€/mes</p>
                <p>Localización: {localizacion}</p>
                <p>Valoración: {notaMedia} </p>
                <button className="gym-button">Ver más</button>
            </div>
        </div>
    )
}
export default Gym;

