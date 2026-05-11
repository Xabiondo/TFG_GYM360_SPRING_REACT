// src/services/personalTrainerService.js

const API_URL = "http://localhost:8080/api/personalTrainer";

export const getAssessment = async (mensajeUsuario) => {
  const promptBody = JSON.stringify({ prompt: mensajeUsuario });

  const response = await fetch(`${API_URL}/assesment`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: promptBody
  });
  
  if (!response.ok) {
    throw new Error('Error en la petición al servidor');
  }
  
  const text = await response.text();
  

  const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  
  return JSON.parse(cleanJson);
};

export const saveAssessment = async (dietaData) => {

  const dataToSave = { ...dietaData, usuarioId: 1 };

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