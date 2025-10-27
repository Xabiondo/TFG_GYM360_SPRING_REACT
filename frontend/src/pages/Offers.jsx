

import React from 'react'
import Offer from '../components/Offer'

const Offers = () => {
  const offers = [
    { id: 1, title: 'Membresía Anual', description: 'Acceso ilimitado por un año', price: '299€' },
    { id: 2, title: 'Entrenador Personal', description: 'Sesiones semanales con entrenador', price: '50€/mes' },
    { id: 3, title: 'Clases Grupales', description: 'Yoga, pilates y más', price: '20€/mes' },
  ]

  return (
    <div className="offers">
      <h1>Ofertas Especiales</h1>
      <div className="offers-grid">
        {offers.map(offer => (
          <Offer key={offer.id} {...offer} />
        ))}
      </div>
    </div>
  )
}

export default Offers

