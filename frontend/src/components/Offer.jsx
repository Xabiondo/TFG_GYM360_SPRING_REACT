import React, { useState } from 'react'
import './offer.css'

import { useAuth } from '../context/AuthContext';

const Offer = ({ id, titulo, descripcion, precio, rutaFoto, popularidad }) => {


  const { user } = useAuth(); 

  const [voto, setVoto] = useState(popularidad || 0); 
  const [yaVotado, setYaVotado] = useState(false);
  
  const imagenMostrar = rutaFoto || "https://via.placeholder.com/300x200?text=No+Image";


  const enviarVotoBackend = async (nuevoVoto) => {
    if (!user) return; 

    const datoVoto = {
      ofertaId: id, 
      usuarioId: user.id,
      valor: nuevoVoto 
    };

    try {
      const response = await fetch("http://localhost:8080/api/votar", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datoVoto) 
      });
      
      if (!response.ok) throw new Error("Error al votar");
      
    } catch (error) {
      console.log("Error enviando voto:", error);
    }
  };

  const aumentarPopularidad = () => {
    if (!yaVotado) {
      const nuevoValor = voto + 1;
      setVoto(nuevoValor);
      setYaVotado(true);
      enviarVotoBackend(nuevoValor); 
    }
  };

  const disminuirPopularidad = () => {
    if (!yaVotado) {
      const nuevoValor = voto - 1;
      setVoto(nuevoValor);
      setYaVotado(true);
      enviarVotoBackend(nuevoValor); 
    }
  };

  return (
    <div className="offer-card">
      
      <div className="offer-votes">
        <button className="vote-btn" onClick={aumentarPopularidad}>▲</button>
        <span className="vote-count">{voto}</span>
        <button className="vote-btn" onClick={disminuirPopularidad}>▼</button>
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

        <img src={imagenMostrar} alt={titulo} /> 
      </div>

    </div>
  )
}

export default Offer