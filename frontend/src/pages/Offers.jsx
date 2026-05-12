import React, { useState, useEffect } from 'react';
import './Offers.css';
import Offer from '../components/Offer';
import Navbar from '../components/Navbar';

// Importamos nuestro servicio limpio
import { obtenerOfertas } from '../services/ofertaService';

const Offers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                // Llamamos a la función humilde del servicio
                const datosOfertas = await obtenerOfertas();
                setOffers(datosOfertas);

            } catch (error) {
                console.log("Error al cargar ofertas:", error);
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
                    </header>

                    <div className="offers-list">
                        {/* Si hay ofertas, las pintamos. Si la BBDD está vacía, mostramos el mensaje */}
                        {offers.length > 0 ? (
                            offers.map(offer => (
                                <Offer key={offer.id} {...offer} />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
                                Aún no hay ofertas disponibles. (Inicializa la BBDD 🚀)
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Offers;