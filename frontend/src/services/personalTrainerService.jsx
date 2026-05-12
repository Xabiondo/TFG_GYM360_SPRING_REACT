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
  
  // Tu backend de Java ahora devuelve un String (que es un JSON válido) con response.text()
  // React necesita parsearlo a un objeto real
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
  
  // Tu Java espera recibir la entidad UsuarioDieta entera.
  // IMPORTANTE: Asegúrate de que el objeto "usuario" esté anidado,
  // como hicimos en los comentarios del gimnasio, si tu backend lo requiere así.
  // Si en Java UsuarioDieta tiene private Integer usuarioId; entonces esto está bien.
  // Si en Java UsuarioDieta tiene private Usuario usuario; entonces hay que cambiarlo.
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