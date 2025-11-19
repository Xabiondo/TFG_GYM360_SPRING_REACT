import React from 'react'
import Offer from '../components/Offer'
import Navbar from '../components/Navbar'

const Offers = () => {
  const offers = [
    { id: 1, title: 'Creatina Monohidrato', description: '1kg • Pureza 100% micronizada', price: '30€' },
    { id: 2, title: 'Entrenador Personal', description: 'Plan 1:1 • Seguimiento diario', price: '50€/mes' },
    { id: 3, title: 'Clases Grupales', description: 'Acceso ilimitado: Yoga, CrossFit', price: '20€/mes' },
  ]

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="offers-container">
        <header className="offers-header">
          <h1>PLANES & <span className="text-gradient">OFERTAS</span></h1>
          <p>Eleva tu rendimiento al siguiente nivel.</p>
        </header>

        <div className="offers-grid">
          {offers.map(offer => (
            <Offer key={offer.id} {...offer} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Offers