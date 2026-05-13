import React, { useState } from 'react';
import './Offer.css';
import { useAuth } from '../context/AuthContext';

const Offer = ({ id, titulo, descripcion, precio, rutaFoto, popularidad, enlace, usuario, onEliminar }) => {
    
    const { user } = useAuth(); 
    
    const [totalVotos, setTotalVotos] = useState(popularidad || 0); 
    const [miVoto, setMiVoto] = useState(0); 

    const imagenMostrar = rutaFoto || "https://via.placeholder.com/300x200?text=No+Image";
    const nombreCreador = usuario?.nombre || "Usuario Anónimo";
    
    const esMiOferta = user && usuario && user.id === usuario.id;

    const handleDelete = async () => {
        if (window.confirm("¿Seguro que quieres borrar esta oferta? Esta acción no se puede deshacer.")) {
            try {
                const response = await fetch(`http://localhost:8080/api/ofertas/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    onEliminar(id);
                } else {
                    alert("Error al intentar borrar la oferta.");
                }
            } catch (error) {
                console.log("Error de conexión:", error);
            }
        }
    };

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosVoto) 
            });
        } catch (error) {
            console.log("Error enviando voto:", error);
        }
    };

    const handleSubir = () => {
        if (user === null) return alert("Inicia sesión para votar");
        if (miVoto === 1) { setTotalVotos(totalVotos - 1); setMiVoto(0); enviarVotoBackend(3); } 
        else if (miVoto === 2) { setTotalVotos(totalVotos + 2); setMiVoto(1); enviarVotoBackend(1); } 
        else if (miVoto === 0) { setTotalVotos(totalVotos + 1); setMiVoto(1); enviarVotoBackend(1); }
    };

    const handleBajar = () => {
        if (user === null) return alert("Inicia sesión para votar");
        if (miVoto === 2) { setTotalVotos(totalVotos + 1); setMiVoto(0); enviarVotoBackend(3); } 
        else if (miVoto === 1) { setTotalVotos(totalVotos - 2); setMiVoto(2); enviarVotoBackend(2); } 
        else if (miVoto === 0) { setTotalVotos(totalVotos - 1); setMiVoto(2); enviarVotoBackend(2); }
    };

    const irAlEnlace = () => {
        if (enlace) window.open(enlace, '_blank');
        else alert("Esta oferta no tiene un enlace configurado.");
    };

    let colorBotonSubir = miVoto === 1 ? "var(--acent)" : "#a1a1aa";
    let colorBotonBajar = miVoto === 2 ? "#ff4444" : "#a1a1aa";

    return (
        <div className="offer-card">
            
            <div className="offer-votes">
                <button className="vote-btn" onClick={handleSubir} style={{ color: colorBotonSubir }}>▲</button>
                <span className="vote-count">{totalVotos}</span>
                <button className="vote-btn" onClick={handleBajar} style={{ color: colorBotonBajar }}>▼</button>
            </div>

            <div className="offer-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3>{titulo}</h3> 
                        <span className="offer-creator">Publicado por: {nombreCreador}</span>
                    </div>
                    {esMiOferta && (
                        <button className="delete-offer-btn" onClick={handleDelete}>
                            🗑️ Borrar
                        </button>
                    )}
                </div>
                
                <p className="offer-description">{descripcion}</p>
                
                <div className="offer-footer">
                    <div className="price">{precio} €</div>
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