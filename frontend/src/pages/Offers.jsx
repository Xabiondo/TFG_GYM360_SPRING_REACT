import React, { useState } from 'react'
import './Offers.css'
import Offer from '../components/Offer'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'

const Offers = () => {
  const [offers, setOffers] = useState([]);


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/ofertas", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("error en la petición");
        }
        const ofertas = await response.json();
        setOffers(ofertas);

      } catch (error) {
        console.log("error al cargar ofertas", error);
      }


    }
    fetchOffers();
  }, [])


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