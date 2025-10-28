
import React from 'react'
import Offer from '../components/Offer'
import Navbar from '../components/Navbar'   

const Offers = () => {
  const offers = [
    { id: 1, title: 'Creatina', description: '1 kilo de creatina', price: '30€' },
    { id: 2, title: 'Entrenador Personal', description: 'Sesiones semanales con entrenador', price: '50€/mes' },
    { id: 3, title: 'Clases Grupales', description: 'Yoga, pilates y más', price: '20€/mes' },
  ]

  return (

    <div className="offers">
    <Navbar></Navbar>
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

