import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { obtenerGimnasioDetalle, obtenerGimnasioInfoExtra, getImagenUrl } from '../services/gymDetailsService';
import './GymDetails.css';

const GymDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [cargando, setCargando] = useState(true);
    
    const [nuevoComentario, setNuevoComentario] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    

    useEffect(() => {
        fetchGym();
    }, [id]);

    const fetchGym = async () => {
        try {
            // 1. Pedimos los datos básicos
            const dataBase = await obtenerGimnasioDetalle(id);
            
            // 2. Pedimos la información extra (puede venir null si no existe)
            const infoExtra = await obtenerGimnasioInfoExtra(id);
            
            // 3. Juntamos todo en un solo objeto. 
            // Si infoExtra es null, usamos un objeto vacío {} para que no falle.
            const gimnasioCompleto = { ...dataBase, ...(infoExtra || {}) };
            
            setGym(gimnasioCompleto);
            console.log("Datos fusionados de este gym:", gimnasioCompleto);
        } catch (error) {
            console.error("Error al cargar el gimnasio:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleEnviarComentario = async () => {
        if (!nuevoComentario.trim()) return;

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
                    {/* INFO IZQUIERDA - AHORA CON LOS DATOS EXTRAS */}
                    <div className="details-card">
                        <h2>Información</h2>
                        
                        {/* Precio */}
                        {gym.precio != null && (
                            <p className="gym-price">{gym.precio}€<span className="period">/mes</span></p>
                        )}
                        
                        {/* Puntuación */}
                        <p className="details-text" style={{marginBottom: '1.5rem'}}>
                            ★ {gym.puntuacion?.toFixed(1)} / 5 ({gym.totalResenas} reseñas)
                        </p>

                        {/* Etiquetas de Tipo y Ambiente */}
                        {(gym.tipo || gym.ambiente) && (
                            <div style={{marginBottom: '1.5rem'}}>
                                {gym.tipo && <span className="details-badge" style={{background: 'var(--accent)', color: 'black', marginRight: '10px'}}>{gym.tipo}</span>}
                                {gym.ambiente && <span className="details-badge" style={{background: 'rgba(255,255,255,0.1)'}}>{gym.ambiente}</span>}
                            </div>
                        )}

                        {/* Datos extra */}
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            {gym.horario && (
                                <p className="details-text"><strong>🕒 Horario:</strong> {gym.horario}</p>
                            )}
                            
                            {gym.servicios && (
                                <p className="details-text"><strong>🏋️ Servicios:</strong> {gym.servicios}</p>
                            )}
                            
                            {gym.descripcion && (
                                <div style={{marginTop: '10px'}}>
                                    <strong style={{color: 'var(--text-main)'}}>📝 Descripción:</strong>
                                    <p className="details-text" style={{marginTop: '5px', lineHeight: '1.6'}}>{gym.descripcion}</p>
                                </div>
                            )}
                        </div>

                        <button className="gym-btn" style={{width: '100%', marginTop: '2rem'}}>Inscribirse</button>
                    </div>

                    {/* COMENTARIOS DERECHA */}
                    <div className="details-card">
                        <h2>Comentarios</h2>
                        
                        <div className="comments-list">
                            {gym.comentarios?.length > 0 ? (
                                gym.comentarios.map((c, i) => (
                                    <div key={i} className="comment-item">
                                        <div className="comment-header">
                                            <p className="comment-author">{c.usuarioNombre}</p>
                                            {/* Opcional: mostrar fecha si la guardas */}
                                        </div>
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