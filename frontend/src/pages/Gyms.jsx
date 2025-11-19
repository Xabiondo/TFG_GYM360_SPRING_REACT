import React from 'react';
import Navbar from '../components/Navbar';
import Gym from '../components/Gym';

const Gyms = () => {
  const gimnasios = [
    { id: 1, nombre: "Sinnergym", precio: 25, localizacion: "Txantrea", notaMedia: 8, imagen: "/assets/sinerGym.jpg" },
    { id: 2, nombre: "Vivagym", precio: 40, localizacion: "Morea", notaMedia: 8, imagen: "/vivagym.jpg" },
    { id: 3, nombre: "Gimnasio Easo", precio: 30, localizacion: "Centro", notaMedia: 7, imagen: "/easogym.jpg" },
    { id: 4, nombre: "Gym24", precio: 20, localizacion: "Berriozar", notaMedia: 9, imagen: "/gym24.jpg" },
  ];

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="offers-container">
        <header className="offers-header">
          <h1>GIMNASIOS <span className="text-gradient">TOP</span></h1>
          <p>Explora las mejores instalaciones en tu área.</p>
        </header>

        {/* Usamos grid-layout que definimos en App.css */}
        <div className="grid-layout">
          {gimnasios.map(gym => (
            <Gym key={gym.id} {...gym} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gyms;