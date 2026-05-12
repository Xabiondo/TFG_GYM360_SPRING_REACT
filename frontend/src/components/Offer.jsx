import React, { useState } from 'react';
import './Offer.css';
import { useAuth } from '../context/AuthContext';

const Offer = ({ id, titulo, descripcion, precio, rutaFoto, popularidad, enlace }) => {
    
    const { user } = useAuth(); 
    
    // Estados para controlar los votos en pantalla
    const [totalVotos, setTotalVotos] = useState(popularidad || 0); 
    const [miVoto, setMiVoto] = useState(0); 

    const imagenMostrar = rutaFoto || "https://via.placeholder.com/300x200?text=No+Image";

    // Función que manda el 1, 2 o 3 al Backend
    const enviarVotoBackend = async (valorVoto) => {
        if (user === null) return; 

        const datosVoto = {
            ofertaId: id, 
            usuarioId: user.id,
            valor: valorVoto 
        };

        try {
            await fetch("http://localhost:8080/api/ofertas/votar", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosVoto) 
            });
        } catch (error) {
            console.log("Error enviando voto:", error);
        }
    };

    // Botón de flecha ARRIBA
    const handleSubir = () => {
        if (user === null) {
            alert("Inicia sesión para votar");
            return;
        }

        if (miVoto === 1) {
            // Ya voté positivo y le doy otra vez -> Me arrepiento (Mando 3)
            setTotalVotos(totalVotos - 1);
            setMiVoto(0);
            enviarVotoBackend(3);
        } else if (miVoto === 2) {
            // Había votado negativo y ahora le doy a positivo (+2 de golpe)
            setTotalVotos(totalVotos + 2);
            setMiVoto(1);
            enviarVotoBackend(1);
        } else if (miVoto === 0) {
            // Voto positivo por primera vez
            setTotalVotos(totalVotos + 1);
            setMiVoto(1);
            enviarVotoBackend(1);
        }
    };

    // Botón de flecha ABAJO
    const handleBajar = () => {
        if (user === null) {
            alert("Inicia sesión para votar");
            return;
        }

        if (miVoto === 2) {
            // Ya voté negativo y le doy otra vez -> Me arrepiento (Mando 3)
            setTotalVotos(totalVotos + 1);
            setMiVoto(0);
            enviarVotoBackend(3);
        } else if (miVoto === 1) {
            // Había votado positivo y ahora le doy a negativo (-2 de golpe)
            setTotalVotos(totalVotos - 2);
            setMiVoto(2);
            enviarVotoBackend(2);
        } else if (miVoto === 0) {
            // Voto negativo por primera vez
            setTotalVotos(totalVotos - 1);
            setMiVoto(2);
            enviarVotoBackend(2);
        }
    };

    // Lógica para abrir la URL de la oferta
    const irAlEnlace = () => {
        if (enlace) {
            window.open(enlace, '_blank');
        } else {
            alert("Esta oferta no tiene un enlace configurado.");
        }
    };

    // Definimos qué colores tienen las flechitas según lo que haya votado
    let colorBotonSubir = "#a1a1aa";
    if (miVoto === 1) {
        colorBotonSubir = "var(--acent)";
    }

    let colorBotonBajar = "#a1a1aa";
    if (miVoto === 2) {
        colorBotonBajar = "#ff4444"; // Rojo para el negativo
    }

    return (
        <div className="offer-card">
            
            <div className="offer-votes">
                <button 
                    className="vote-btn" 
                    onClick={handleSubir}
                    style={{ color: colorBotonSubir }}
                >
                    ▲
                </button>
                
                <span className="vote-count">{totalVotos}</span>
                
                <button 
                    className="vote-btn" 
                    onClick={handleBajar}
                    style={{ color: colorBotonBajar }}
                >
                    ▼
                </button>
            </div>

            <div className="offer-content">
                <h3>{titulo}</h3> 
                <p className="offer-description">{descripcion}</p>
                
                <div className="offer-footer">
                    <div className="price">{precio} €</div>
                    {/* Añadido el evento onClick para ir al enlace */}
                    <button className="offer-button" onClick={irAlEnlace}>
                        Seleccionar
                    </button>
                </div>
            </div>

            <div className="offer-image-container">
                <img src={imagenMostrar} alt={titulo} /> 
            </div>

        </div>
    );
};

export default Offer;