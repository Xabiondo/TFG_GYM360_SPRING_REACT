import React from 'react'

const Offer = ({ title, description, price }) => {
  return (
    <div className="offer-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="price">{price}</div>
      <button className="offer-button">Seleccionar</button>
    </div>
  )
}

export default Offer
