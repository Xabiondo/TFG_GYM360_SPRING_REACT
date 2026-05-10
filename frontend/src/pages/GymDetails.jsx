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

    useEffect(() => {
        const fetchGym = async () => {
            try {
                const data = await obtenerGimnasioDetalle(id);
                setGym(data);
            } catch (error) {
                console.error("Error al cargar el gimnasio:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchGym();
    }, [id]);

    if (cargando) return (
        <div className="gyms-page">
            <h2 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando...</h2>
        </div>
    );

    if (!gym) return (
        <div className="gyms-page">
            <h2 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Gimnasio no encontrado</h2>
        </div>
    );

    return (
        <div className="gyms-page">
            <Navbar />
            <div className="details-container">
                <button className="back-btn" onClick={() => navigate(-1)}>← Volver a Gimnasios</button>

                <div className="details-header">
                    <img
                        src={getImagenUrl(gym.fotoReferencia)}
                        alt={gym.nombre}
                        className="details-hero-img"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                    />
                    <div className="details-title-box">
                        <h1>{gym.nombre}</h1>
                        <div className="badges-row">
                            <span className="location-badge details-badge">📍 {gym.direccion}</span>
                            <span className="rating-badge details-badge">★ {gym.puntuacion?.toFixed(1) ?? 'S/N'}/5</span>
                            <span className={`status-badge ${gym.abiertoAhora ? 'open' : 'closed'}`}>
                                {gym.abiertoAhora ? '🟢 Abierto' : '🔴 Cerrado'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="details-info-card">
                        <h2>Información General</h2>
                        {gym.precio && (
                            <p className="gym-price" style={{ marginBottom: '1rem' }}>
                                {gym.precio}€ <span className="period">/mes</span>
                            </p>
                        )}

                        <h3 className="section-subtitle">Tipos</h3>
                        <div className="tags-container">
                            {gym.tipos?.split(',').map((tipo, i) => (
                                <span key={i} className="gyms-badge" style={{ display: 'inline-block', margin: '4px' }}>
                                    {tipo.trim()}
                                </span>
                            ))}
                        </div>

                        <h3 className="section-subtitle">Total reseñas</h3>
                        <p className="details-text">📝 {gym.totalResenas ?? 0} reseñas</p>

                        <button className="gym-btn" style={{ width: '100%', marginTop: '2rem' }}>
                            Inscribirse Ahora
                        </button>
                    </div>

                    <div className="details-comments-card">
                        <h2>Comentarios de Usuarios</h2>
                        <p className="details-text">Aún no hay comentarios para este gimnasio.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymDetails;