import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Comentario from '../components/Comentario';
import {
    obtenerGimnasioDetalle,
    obtenerGimnasioInfoExtra,
    getImagenUrl,
    obtenerComentariosGimnasio,
    enviarComentario
} from '../services/gymDetailsService';
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
            // 1. Pedimos todo a la vez
            const dataBase = await obtenerGimnasioDetalle(id);
            const infoExtra = await obtenerGimnasioInfoExtra(id);
            const comentariosDb = await obtenerComentariosGimnasio(id); // 👈 Traemos los comentarios de la DB

            // 2. Fusionamos todo, añadiendo los comentarios
            const gimnasioCompleto = {
                ...dataBase,
                ...(infoExtra || {}),
                comentarios: comentariosDb
            };

            setGym(gimnasioCompleto);
        } catch (error) {
            console.error("Error al cargar el gimnasio:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleEnviarComentario = async () => {
        if (!nuevoComentario.trim()) return;

        try {
            // Llamamos a la API para guardarlo en MySQL
            const comentarioGuardado = await enviarComentario(id, user.id, nuevoComentario);

            // Actualizamos la pantalla al instante poniendo el nuevo arriba del todo
            setGym({
                ...gym,
                comentarios: [comentarioGuardado, ...(gym.comentarios || [])]
            });

            setNuevoComentario("");
            alert("¡Comentario añadido!");
        } catch (error) {
            alert("Hubo un error al guardar tu comentario. Inténtalo de nuevo.");
        }
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

                        {gym.precio != null && (
                            <p className="gym-price">{gym.precio}€<span className="period">/mes</span></p>
                        )}

                        <p className="details-text" style={{ marginBottom: '1.5rem' }}>
                            ★ {gym.puntuacion?.toFixed(1)} / 5 ({gym.totalResenas} reseñas)
                        </p>

                        {(gym.tipo || gym.ambiente) && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                {gym.tipo && <span className="details-badge" style={{ background: 'var(--accent)', color: 'black', marginRight: '10px' }}>{gym.tipo}</span>}
                                {gym.ambiente && <span className="details-badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{gym.ambiente}</span>}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {gym.horario && (
                                <p className="details-text"><strong>🕒 Horario:</strong> {gym.horario}</p>
                            )}

                            {gym.servicios && (
                                <div style={{ marginTop: '10px' }}>
                                    <strong style={{ color: 'var(--text-main)' }}>🏋️ Servicios:</strong>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                        {(() => {
                                            try {
                                                const serviciosArray = JSON.parse(gym.servicios);
                                                return serviciosArray.map((servicio, index) => (
                                                    <span key={index} className="details-badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                                                        ✓ {servicio}
                                                    </span>
                                                ));
                                            } catch (e) {
                                                return <span className="details-text">{gym.servicios}</span>;
                                            }
                                        })()}
                                    </div>
                                </div>
                            )}

                            {gym.descripcion && (
                                <div style={{ marginTop: '10px' }}>
                                    <strong style={{ color: 'var(--text-main)' }}>📝 Descripción:</strong>
                                    <p className="details-text" style={{ marginTop: '5px', lineHeight: '1.6' }}>{gym.descripcion}</p>
                                </div>
                            )}
                        </div>

                        <button className="gym-btn" style={{ width: '100%', marginTop: '2rem' }}>Inscribirse</button>
                    </div>

                    <div className="details-card">
                        <h2>Comentarios</h2>

                        <div className="comments-list">
                            {gym.comentarios?.length > 0 ? (
                                gym.comentarios.map((c, i) => (
                                    <Comentario
                                        key={c.id || i}
                                        rutaFoto={c.usuarioFoto ? getImagenUrl(`/images/user/${c.usuarioFoto}`) : null}
                                        nombreUsuario={c.usuarioNombre}
                                        comentario={c.comentario}
                                    />
                                ))
                            ) : (
                                <p className="details-text">No hay comentarios aún. ¡Sé el primero!</p>
                            )}
                        </div>

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
                            <p className="details-text" style={{ marginTop: '1rem' }}>Inicia sesión para comentar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymDetails;