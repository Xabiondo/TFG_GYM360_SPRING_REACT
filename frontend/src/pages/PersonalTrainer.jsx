import { useState } from "react";
import Navbar from "../components/Navbar";
import { getAssessment } from "../services/personalTrainerService"; 
import "./PersonalTrainer.css"; 

const PersonalTrainer = () => {
  // 1. Nuestros estados (las variables donde guardamos datos)
  const [mensaje, setMensaje] = useState('');
  const [respuestaEntrenador, setRespuestaEntrenador] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <-- ¡Faltaba esto!

  // 2. Función para cuando escribes en la caja de texto
  const handleInputChange = (e) => {
    setMensaje(e.target.value);
  }

  // 3. Función para el botón de Enviar
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (mensaje.trim() === '') {
      alert("Por favor, escribe algo.");
      return; 
    }

    // Encendemos el modo "Cargando" y limpiamos respuestas viejas
    setIsLoading(true); 
    setRespuestaEntrenador(''); 

    try {
      // Llamamos al archivo del Service
      const datos = await getAssessment(mensaje);
      setRespuestaEntrenador(datos);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al consultar al entrenador.");
    } finally {
      // Apagamos el modo "Cargando" cuando termine (falle o acierte)
      setIsLoading(false); 
    }
  }

  return (
    <>
      <Navbar />
      <div className="personal-trainer">
        <div className="pt-container">
          <div className="pt-header">

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
          {(respuestaEntrenador !== '' || isLoading) && (
            <div className="response-area">
              <div className="response-header">
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
    </>
  );
};

export default PersonalTrainer;