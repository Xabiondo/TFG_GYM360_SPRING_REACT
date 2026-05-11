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