import React from 'react'
import './offer.css'

const Offer = ({ titulo, descripcion, precio, rutaFoto, popularidad }) => {

  const imagenMostrar = rutaFoto || "https://via.placeholder.com/300x200?text=No+Image";

    const aumentarPopularidad = () =>{
      popularidad = popularidad  + 1 ;


    }
    const disminuirPopularidad = () =>{
      popularidad = popularidad - 1;

    }
  
  
  return (
    <div className="offer-card">
      

      <div className="offer-votes">
        <button className="vote-btn" onClick={aumentarPopularidad()}>▲</button>
        <span className="vote-count">{popularidad || 0}</span>
        <button className="vote-btn" onClick={disminuirPopularidad()}>▼</button>
      </div>


      <div className="offer-content">
        <h3>{titulo}</h3>
        <p className="offer-description">{descripcion}</p>
        
        <div className="offer-footer">
            <div className="price">{precio} €</div>
            <button className="offer-button">Seleccionar</button>
        </div>
      </div>


      <div className="offer-image-container">
        <img src="./assets/doctor.png" />
      </div>

    </div>
  )
}

export default Offer