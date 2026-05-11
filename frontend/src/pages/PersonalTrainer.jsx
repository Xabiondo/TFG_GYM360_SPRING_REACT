import { useState } from "react";
import Navbar from "../components/Navbar";
import { getAssessment, saveAssessment } from "../services/personalTrainerService"; 
import "./PersonalTrainer.css"; 

const PersonalTrainer = () => {
  const [mensaje, setMensaje] = useState('');
  const [dietaObj, setDietaObj] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    setMensaje(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (mensaje.trim() === '') {
      alert("Por favor, escribe algo.");
      return; 
    }

    setIsLoading(true); 
    setDietaObj(null); 

    try {
      const datosJSON = await getAssessment(mensaje);
      setDietaObj(datosJSON);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al consultar al entrenador.");
    } finally {
      setIsLoading(false); 
    }
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveAssessment(dietaObj);
      alert("¡Dieta guardada con éxito! Podrás verla en la sección de Nutrición.");
    } catch (error) {
      console.error(error);
      alert("Error al guardar la dieta.");
    } finally {
      setIsSaving(false);
    }
  }

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

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
              placeholder="Ej: Quiero una dieta y rutina de 3 días para hipertrofia..."
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

          {(dietaObj !== null || isLoading) && (
            <div className="response-area">
              <div className="response-header">
                <h3>Respuesta del Sistema</h3>
                
                {!isLoading && dietaObj && (
                  <button 
                    className="save-button" 
                    onClick={handleSave} 
                    disabled={isSaving}
                  >
                    {isSaving ? 'Guardando...' : 'Guardar Dieta'}
                  </button>
                )}
              </div>
              
              <div className="response-content">
                {isLoading ? (
                  <p className="loading-text">Procesando tu solicitud (esto puede tardar unos segundos)...</p>
                ) : (
                  <div className="dieta-visual">
                    <h2 className="dieta-title">{dietaObj.nombreDieta}</h2>
                    <p className="dieta-caracteristicas">
                      {dietaObj.caracteristicas}
                    </p>
                    
                    <div className="dias-grid">
                      {diasSemana.map((dia) => (
                        <div key={dia} className="dia-card">
                          <h4 className="dia-title">{dia}</h4>
                          <p className="dia-text">{dietaObj[dia]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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