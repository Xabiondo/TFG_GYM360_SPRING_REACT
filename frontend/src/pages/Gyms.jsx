import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Gym from '../components/Gym';
import SearchBar from '../components/SearchBar'; // <-- Importamos el buscador
import './Gyms.css';

const GIMNASIOS_MOCK = [
  {
    placeId: "1",
    nombre: "Iron Temple Fitness",
    direccion: "Av. Principal 123, Centro",
    puntuacion: 4.8,
    totalResenas: 156,
    abiertoAhora: true,
    fotoReferencia: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400"
  },
  {
    placeId: "2",
    nombre: "Zenith Yoga & Pilates",
    direccion: "Calle Secundaria 45, Norte",
    puntuacion: 4.5,
    totalResenas: 89,
    abiertoAhora: false,
    fotoReferencia: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
  },
  {
    placeId: "3",
    nombre: "Power Box Crossfit",
    direccion: "Polígono Industrial Nave 4",
    puntuacion: 4.9,
    totalResenas: 210,
    abiertoAhora: true,
    fotoReferencia: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400"
  }
];

const Gyms = () => {

  const [busqueda, setBusqueda] = useState('');
  const [filtroAbierto, setFiltroAbierto] = useState('todos');


  const gimnasiosFiltrados = GIMNASIOS_MOCK.filter((gym) => {

    const coincideTexto = gym.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          gym.direccion.toLowerCase().includes(busqueda.toLowerCase());
    

    const coincideEstado = filtroAbierto === 'todos' ? true : gym.abiertoAhora === true;

    return coincideTexto && coincideEstado;
  });

  return (
    <>
      <Navbar />
      <div className="gyms-page">
        <div className="gyms-container">
          <header className="gyms-header">
            <h1>GIMNASIOS <span className="text-gradient">TOP</span></h1>
            <p>Explora las mejores instalaciones en tu área.</p>
          </header>


          <SearchBar 
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroAbierto={filtroAbierto}
            setFiltroAbierto={setFiltroAbierto}
          />

          <div className="gym-list">

            {gimnasiosFiltrados.length > 0 ? (
              gimnasiosFiltrados.map(gym => (
                <Gym key={gym.placeId} {...gym} />
              ))
            ) : (

              <p style={{ textAlign: 'center', color: '#888' }}>
                No se han encontrado gimnasios con esos filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gyms;