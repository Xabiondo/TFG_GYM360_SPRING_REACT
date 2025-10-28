import React from 'react';
import Navbar from '../components/Navbar';
import Gym from '../components/Gym'; // ← IMPORTANTE: importa tu componente

const Gyms = () => {
  const gimnasios = [
    { id: 1, nombre: "Sinnergym", precio: 25, localizacion: "Txantrea", notaMedia: 8, imagen: "/assets/sinerGym.jpg" },
    { id: 2, nombre: "Vivagym", precio: 40, localizacion: "Morea", notaMedia: 8, imagen: "/vivagym.jpg" },
    { id: 3, nombre: "Gimnasio Easo", precio: 30, localizacion: "Centro", notaMedia: 7, imagen: "/easogym.jpg" },
    { id: 4, nombre: "Gym24", precio: 20, localizacion: "Berriozar", notaMedia: 9, imagen: "/gym24.jpg" },


  ];

  return (
    <div className="gyms">
      <Navbar />
      <h1>Gimnasios Cercanos</h1>
      <p>Explora gimnasios en tu área.</p>
      <br></br>
      <div className="gym-grid">

        {gimnasios.map(gym => (
          <Gym key={gym.id }{...gym}></Gym>
        ))}
         
      </div>
    </div>
  );
};

export default Gyms;