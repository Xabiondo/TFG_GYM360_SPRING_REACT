import React, { useState } from 'react'
import './offer.css'

const Offer = ({id ,titulo, descripcion, precio, rutaFoto, popularidad }) => {


  const [voto , setVoto] = useState(popularidad)
  const [valorVoto , setValorVoto] = useState(false)
  const [yaVotado  , setYaVotado] = useState(false)
  const imagenMostrar = rutaFoto || "https://via.placeholder.com/300x200?text=No+Image";

    const aumentarPopularidad = () =>{
      if(!yaVotado){
        setVoto(voto + 1);
        setValorVoto(true);
        setYaVotado(true);

      }
 
    }
    const disminuirPopularidad = () =>{
      if(!yaVotado){
        setVoto(voto - 1);
        setValorVoto(false);
        setYaVotado(true);
      }
 
    }
    const Popularidad = async (e) =>{
      e.preventDefault();

      try{
        const response = await fetch("http://localhost:8080/api/")
      }


    }
  

  return (
    <div className="offer-card">
      

      <div className="offer-votes">
        <button className="vote-btn" onClick={aumentarPopularidad}>▲</button>
        <span className="vote-count">{voto || 0}</span>
        <button className="vote-btn" onClick={disminuirPopularidad}>▼</button>
      </div>


      <div className="offer-content">
        <h3>{id}  {titulo}</h3>
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