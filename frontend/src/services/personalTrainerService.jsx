// AQUI ESTABA EL ERROR: Cambiamos /api/entrenador por /api/personalTrainer
const API_URL = "http://localhost:8080/api/personalTrainer"; 

export const getAssessment = async (mensaje) => {
  // AQUI ESTABA EL ERROR: Cambiamos /generate por /assesment
  const response = await fetch(`${API_URL}/assesment`, { 
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: mensaje }) 
  });
  
  if (!response.ok) {
    throw new Error('Error al generar el plan con el entrenador');
  }
  
  const textResponse = await response.text();
  try {
      return JSON.parse(textResponse);
  } catch (error) {
      console.error("Gemini no devolvió un JSON válido:", textResponse);
      throw new Error("El formato de respuesta de la IA no es válido");
  }
};

export const saveAssessment = async (dietaData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const dataToSave = { ...dietaData, usuarioId: user.id };

  const response = await fetch(`${API_URL}/save`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify(dataToSave)
  });
  
  if (!response.ok) {
    throw new Error('Error al guardar el plan');
  }
  
  return await response.text();
};