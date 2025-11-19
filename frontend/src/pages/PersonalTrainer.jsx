import { useState } from "react";
import Navbar from "../components/Navbar";
import "./PersonalTrainer.css"; 

const PersonalTrainer = () => {
  const [mensaje, setMensaje] = useState('');
  const [respuestaEntrenador, setRespuestaEntrenador] = useState('');
  // Nuevo estado para saber si está cargando
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setMensaje(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Buena práctica añadir esto si estuviera dentro de un form

    if (mensaje.trim() === '') {
      alert("Por favor, describe tu objetivo.");
      return;
    }

    setIsLoading(true); // Activamos modo carga
    setRespuestaEntrenador(''); // Limpiamos respuesta anterior

    const promptBody = JSON.stringify({
      prompt: mensaje
    });

    try {
      const response = await fetch("http://localhost:8080/api/personalTrainer/assesment", {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: promptBody
      });
      
      if (!response.ok) throw new Error('Error en la petición');
      
      const data = await response.text();
      setRespuestaEntrenador(data);

    } catch (error) {
      console.error(error);
      alert("Hubo un error al consultar al entrenador.");
    } finally {
      setIsLoading(false); // Desactivamos modo carga pase lo que pase
    }
  }

  return (
    <div className="personal-trainer">
      <Navbar />
      
      <div className="pt-container">
        <div className="pt-header">
          <span className="ai-badge">AI POWERED</span>
          <h1>Entrenador Virtual</h1>
          <p>Diseña tu rutina, pregunta sobre nutrición o mejora tu técnica.</p>
        </div>

        <div className="input-area">
          <label htmlFor="prompt" className="input-label">Tu consulta</label>
          <textarea 
            id="prompt"
            className="pt-input"
            value={mensaje} 
            onChange={handleInputChange}
            placeholder="Ej: Quiero una rutina de 3 días para hipertrofia..."
            rows="4" 
          />

          <button 
            className="pt-button" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Analizando...' : 'Generar Plan'}
          </button>
        </div>

        {/* Sección de respuesta con animación de aparición */}
        {(respuestaEntrenador || isLoading) && (
          <div className="response-area">
            <div className="response-header">
              <div className="dot-indicator"></div>
              <h3>Respuesta del Sistema</h3>
            </div>
            
            <div className="response-content">
              {isLoading ? (
                <p className="loading-text">Procesando tu solicitud...</p>
              ) : (
                <pre>{respuestaEntrenador}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalTrainer;