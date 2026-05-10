import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { obtenerGimnasioDetalle, getImagenUrl } from '../services/gymDetailsService';
import './GymDetails.css';

const GymDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [cargando, setCargando] = useState(true);
    
    // Estado para el nuevo comentario
    const [nuevoComentario, setNuevoComentario] = useState("");
    const user = JSON.parse(localStorage.getItem("user")); // Pillar usuario logueado

    useEffect(() => {
        fetchGym();
    }, [id]);

    const fetchGym = async () => {
        try {
            const data = await obtenerGimnasioDetalle(id);
            setGym(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleEnviarComentario = async () => {
        if (!nuevoComentario.trim()) return;

        // Aquí llamarías a tu servicio: postComentario(id, user.id, nuevoComentario)
        // Por ahora, lo añadimos localmente para que lo veas:
        const comentarioMock = {
            usuarioNombre: user.nombre,
            texto: nuevoComentario,
            fecha: new Date().toLocaleDateString()
        };

        setGym({
            ...gym,
            comentarios: [...(gym.comentarios || []), comentarioMock]
        });
        setNuevoComentario("");
        alert("¡Comentario añadido!");
    };

    if (cargando) return <div className="loading">Cargando...</div>;
    if (!gym) return <div className="loading">Gimnasio no encontrado</div>;

    return (
        <div className="gyms-page">
            <Navbar />
            <div className="details-container">
                <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>

                <div className="details-header">
                    <img src={getImagenUrl(gym.fotoReferencia)} alt={gym.nombre} className="details-hero-img" />
                    <div className="details-title-box">
                        <h1>{gym.nombre}</h1>
                        <div className="badges-row">
                            <span className="details-badge">📍 {gym.direccion}</span>
                            <span className={`status-badge ${gym.abiertoAhora ? 'open' : 'closed'}`}>
                                {gym.abiertoAhora ? 'Abierto' : 'Cerrado'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="details-grid">
                    {/* INFO IZQUIERDA */}
                    <div className="details-card">
                        <h2>Información</h2>
                        <p className="gym-price">{gym.precio}€<span className="period">/mes</span></p>
                        <p className="details-text">★ {gym.puntuacion?.toFixed(1)} / 5 ({gym.totalResenas} reseñas)</p>
                        <button className="gym-btn" style={{width: '100%'}}>Inscribirse</button>
                    </div>

                    {/* COMENTARIOS DERECHA */}
                    <div className="details-card">
                        <h2>Comentarios</h2>
                        
                        <div className="comments-list">
                            {gym.comentarios?.length > 0 ? (
                                gym.comentarios.map((c, i) => (
                                    <div key={i} className="comment-item">
                                        <p className="comment-author">{c.usuarioNombre}</p>
                                        <p className="comment-text">{c.texto}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="details-text">No hay comentarios aún.</p>
                            )}
                        </div>

                        {/* ESCRIBIR COMENTARIO */}
                        {user ? (
                            <div className="comment-form">
                                <textarea 
                                    placeholder="Escribe tu opinión..." 
                                    value={nuevoComentario}
                                    onChange={(e) => setNuevoComentario(e.target.value)}
                                />
                                <button className="gym-btn" onClick={handleEnviarComentario}>Enviar</button>
                            </div>
                        ) : (
                            <p className="details-text" style={{marginTop: '1rem'}}>Inicia sesión para comentar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymDetails;