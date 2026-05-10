const API_BASE_URL = "http://localhost:8080";

export const obtenerGimnasioDetalle = async (placeId) => {
    const response = await fetch(`${API_BASE_URL}/api/gimnasios/${placeId}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return response.json();
};

export const getImagenUrl = (fotoReferencia) =>
    fotoReferencia
        ? `${API_BASE_URL}${fotoReferencia}`
        : 'https://via.placeholder.com/400x300?text=Sin+Imagen';