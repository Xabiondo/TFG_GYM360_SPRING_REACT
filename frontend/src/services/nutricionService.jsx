const API_URL = "http://localhost:8080/api/nutricion";

export const getDietasUsuario = async (userId) => {
  const response = await fetch(`${API_URL}/dietas/${userId}`);
  if (!response.ok) {
    throw new Error('Error al cargar las dietas');
  }
  return await response.json();
};