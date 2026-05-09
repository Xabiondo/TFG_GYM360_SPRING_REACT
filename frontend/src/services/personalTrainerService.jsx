// src/services/personalTrainerService.js

const API_URL = "http://localhost:8080/api/personalTrainer/assesment";

export const getAssessment = async (mensajeUsuario) => {
  const promptBody = JSON.stringify({
    prompt: mensajeUsuario
  });

  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: promptBody
  });
  
  if (!response.ok) {
    throw new Error('Error en la petición al servidor');
  }
  
  return await response.text();
};