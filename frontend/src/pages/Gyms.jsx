import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Gym from '../components/Gym'; // Asegúrate de que la ruta es correcta

const Gyms = () => {
  const gimnasios = [gimnasios , setGimnasios] = useState([]) ; 

  useEffect()

  return (
    <div className="gyms-page">
      <Navbar />
      
      <div className="gyms-container">
        <header className="gyms-header">
          <span className="gyms-badge">Selección</span>
          <h1>GIMNASIOS <span className="text-gradient">TOP</span></h1>
          <p>Explora las mejores instalaciones en tu área.</p>
        </header>

        <div className="gym-list">
          {gimnasios.map(gym => (
            <Gym key={gym.id} {...gym} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gyms;