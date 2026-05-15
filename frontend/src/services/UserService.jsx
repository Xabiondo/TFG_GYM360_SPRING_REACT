const API_URL = "http://localhost:8080/api"; // Ajusta a tu base URL

/**
 * Actualiza los datos básicos del usuario (nombre, email, fotoPerfil)
 */
export const updateUser = async (userId, datos) => {
  const response = await fetch(`${API_URL}/usuarios/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el usuario");
  }

  return response.json();
};


export const uploadProfilePhoto = async (formData) => {
  const response = await fetch(`${API_URL}/usuarios/foto`, {
    method: "POST",
    body: formData, // FormData: no pongas Content-Type, el browser lo pone solo
  });

  if (!response.ok) {
    throw new Error("Error al subir la foto");
  }

  return response.json(); // Espera: { nombreArchivo: "uuid-foto.jpg" }
};