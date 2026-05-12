import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getDietasUsuario } from "../services/nutricionService";
import "./Nutricion.css"; 

const Nutricion = () => {
  const [dietas, setDietas] = useState([]);
  const [selectedDietaId, setSelectedDietaId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDietas = async () => {
      try {

        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("No hay usuario en localStorage");
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userString);
        if (!user || !user.id) {
          console.error("No se encontró el ID del usuario");
          setIsLoading(false);
          return;
        }

        const data = await getDietasUsuario(user.id); 
        
        if (Array.isArray(data)) {
          setDietas(data);
          if (data.length > 0) {
            setSelectedDietaId(data[0].id); 
          }
        } else {
          console.warn("El servidor no devolvió una lista de dietas. Dejando vacío.");
          setDietas([]);
        }

      } catch (error) {
        console.error("Error cargando dietas:", error);
        setDietas([]); 
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDietas();
  }, []);

  const dietaActiva = Array.isArray(dietas) 
    ? dietas.find(d => d.id?.toString() === selectedDietaId?.toString())
    : null;
    
  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  return (
    <>
      <Navbar />
      <div className="nutricion-page">
        <div className="nutricion-container">
          <div className="nutricion-header">
            <h1>Mi Nutrición</h1>
            <p>Gestiona tus planes de alimentación guardados.</p>
          </div>

          {isLoading ? (
            <p className="loading-text">Cargando tus dietas...</p>
          ) : !Array.isArray(dietas) || dietas.length === 0 ? (
            <div className="empty-state">
              <p>Aún no tienes ninguna dieta guardada.</p>
              <p>¡Ve al Entrenador Virtual para generar una!</p>
            </div>
          ) : (
            <div className="dieta-viewer">
              
              <div className="selector-area">
                <label htmlFor="dieta-select">Selecciona una dieta:</label>
                <select 
                  id="dieta-select" 
                  className="dieta-select"
                  value={selectedDietaId} 
                  onChange={(e) => setSelectedDietaId(e.target.value)}
                >
                  {dietas.map(dieta => (
                    <option key={dieta.id} value={dieta.id}>
                      {dieta.nombreDieta}
                    </option>
                  ))}
                </select>
              </div>

              {dietaActiva && (
                <div className="response-area">
                  <div className="dieta-visual">
                    <h2 className="dieta-title">{dietaActiva.nombreDieta}</h2>
                    <p className="dieta-caracteristicas">
                      {dietaActiva.caracteristicas}
                    </p>
                    
                    <div className="dias-grid">
                      {diasSemana.map((dia) => (
                        <div key={dia} className="dia-card">
                          <h4 className="dia-title">{dia}</h4>
                          <p className="dia-text">{dietaActiva[dia]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Nutricion;