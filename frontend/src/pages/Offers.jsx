import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';
import Offer from '../components/Offer';
import Navbar from '../components/Navbar';
import { obtenerOfertas } from '../services/ofertaService';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const datosOfertas = await obtenerOfertas();
                setOffers(datosOfertas);
            } catch (error) {
                console.log(error);
            }
        };
        
        cargarOfertas();
    }, []);

    return (
        <>
            <Navbar />
            <div className="offers-page">
                <div className="offers-container">
                    
                    <header className="offers-header">
                        <h1>PLANES & <span className="text-gradient">OFERTAS</span></h1>
                        <p>Eleva tu rendimiento al siguiente nivel.</p>
                        
                        <button 
                            className="offer-button" 
                            onClick={() => navigate('/crear-oferta')}
                            style={{ marginTop: '1.5rem', display: 'inline-block' }}
                        >
                            + Añadir Oferta
                        </button>
                    </header>

                    <div className="offers-list">
                        {offers.length > 0 ? (
                            offers.map(offer => (
                                <Offer 
                                    key={offer.id} 
                                    {...offer} 
                                    onEliminar={(idBorrado) => setOffers(offers.filter(o => o.id !== idBorrado))}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
                                Aún no hay ofertas disponibles.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Offers;