import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Gym from '../components/Gym';
import SearchBar from '../components/SearchBar';
import { obtenerGimnasios, iniciarGimnasios } from '../services/gimnasioService';
import './Gyms.css';

const Gyms = () => {

  const [gyms, setGyms] = useState([]);

  // 2. Estados para el buscador
  const [busqueda, setBusqueda] = useState('');
  const [filtroAbierto, setFiltroAbierto] = useState('todos');
  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [operadorPrecio, setOperadorPrecio] = useState('menor');
  const [valorPrecio, setValorPrecio] = useState('');


  useEffect(() => {
    const fetchGyms = async () => {
      try {
        // Comprobamos si el usuario ha tocado algún filtro
        const hayFiltrosActivos =
          busqueda.trim() !== '' ||
          filtroAbierto !== 'todos' ||
          filtroUbicacion.trim() !== '' ||
          valorPrecio !== '';

        let gymsData;

        // Si hay filtros, buscamos con condiciones. Si no, cargamos todos.
        if (hayFiltrosActivos) {
          const parametrosDeBusqueda = {
            busqueda,
            filtroAbierto,
            filtroUbicacion,
            operadorPrecio,
            valorPrecio
          };
          gymsData = await obtenerGimnasios(parametrosDeBusqueda);
        } else {
          gymsData = await iniciarGimnasios();
        }

        // Actualizamos la pantalla con lo que devuelva el servidor
        setGyms(gymsData);

      } catch (error) {
        console.log("Error al cargar los gimnasios:", error);
      }
    };

    fetchGyms();

  }, [busqueda, filtroAbierto, filtroUbicacion, operadorPrecio, valorPrecio]);

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
            busqueda={busqueda} setBusqueda={setBusqueda}
            filtroAbierto={filtroAbierto} setFiltroAbierto={setFiltroAbierto}
            filtroUbicacion={filtroUbicacion} setFiltroUbicacion={setFiltroUbicacion}
            operadorPrecio={operadorPrecio} setOperadorPrecio={setOperadorPrecio}
            valorPrecio={valorPrecio} setValorPrecio={setValorPrecio}

            // Aquí personalizamos la apariencia para GIMNASIOS
            placeholderBusqueda="Buscar gimnasio por nombre..."
            textoOpcionTodos="Todos los gimnasios"
            textoOpcionAbiertos="Gimnasios abiertos ahora"
          />

          <div className="gym-list">
            {/* Renderizamos los datos reales de la API */}
            {gyms.length > 0 ? (
              gyms.map(gym => (
                // Usamos gym.id o gym.placeId dependiendo de cómo te lo devuelva tu backend
                <Gym key={gym.id || gym.placeId} {...gym} />
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