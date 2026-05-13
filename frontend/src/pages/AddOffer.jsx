import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './AddOffer.css';

const AddOffer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [enlace, setEnlace] = useState('');
  const [rutaFoto, setRutaFoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión para publicar una oferta");
      return;
    }

    const nuevaOferta = {
      titulo,
      descripcion,
      precio: parseInt(precio),
      enlace,
      rutaFoto,
      popularidad: 0,
      usuario: {
        id: user.id
      }
    };

    try {
      const response = await fetch("http://localhost:8080/api/ofertas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaOferta)
      });

      if (response.ok) {
        alert("¡Oferta publicada con éxito!");
        navigate('/offers'); // <-- AQUÍ ESTABA EL FALLO, AHORA REDIRIGE BIEN
      } else {
        alert("Error al crear la oferta. Revisa la consola.");
      }
    } catch (error) {
      console.log("Error de conexión:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="add-offer-container">
        <div className="add-offer-card">
          <h2>Publicar Nueva Oferta</h2>
          <form onSubmit={handleSubmit} className="add-offer-form">
            <div className="form-group">
              <label>Título</label>
              <input 
                type="text" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
                placeholder="Ej: Zapatillas Nike Air Max"
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                required 
                rows="4"
                placeholder="Detalles de la oferta..."
              />
            </div>

            <div className="form-group row-group">
              <div className="half-width">
                <label>Precio (€)</label>
                <input 
                  type="number" 
                  value={precio} 
                  onChange={(e) => setPrecio(e.target.value)} 
                  required 
                  min="0"
                />
              </div>
              <div className="half-width">
                <label>Enlace (URL)</label>
                <input 
                  type="url" 
                  value={enlace} 
                  onChange={(e) => setEnlace(e.target.value)} 
                  required 
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>URL de la Foto (Opcional)</label>
              <input 
                type="text" 
                value={rutaFoto} 
                onChange={(e) => setRutaFoto(e.target.value)} 
                placeholder="https://.../imagen.jpg"
              />
            </div>

            <button type="submit" className="offer-button submit-offer">
              Publicar Oferta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;