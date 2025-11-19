import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      
      <div className="home-container">
        <div className="home-text">
          <h1 className="main-title">
            GYM360 <span className="text-highlight">SYSTEM</span>
          </h1>
          <h2 className="subtitle">Tu salud, simplificada.</h2>
          <p className="description">
            Unifica todo lo relacionado con el mundo del entrenamiento de manera gratuita. 
            Sin barreras, solo resultados.
          </p>
          
          <div className="cta-wrapper">
            <button className="home-btn">Empezar Ahora</button>
          </div>
        </div>

        <div className="home-photo">
          <img src='./assets/gymNegro.webp' alt='home-illustration' />
          {/* Un pequeño degradado sobre la foto para que se funda con el negro */}
          <div className="photo-overlay"></div>
        </div>
      </div>
    </div>
  )
}

export default Home