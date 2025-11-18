import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <div className="home-text">
          <h1>Bienvenido a Gym360</h1>
          <p>Tu salud, simplificada</p>
          <p>Unifica todo lo relacionado con el mundo del entrenamiento de manera gratuita.</p>
        </div>
        <div className="home-photo">
          <img src='./assets/gymNegro.webp' alt='home-illustration' width={500} />
        </div>
      </div>
    </div>
  )
}

export default Home