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

export const obtenerGimnasioInfoExtra = async (placeId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/gimnasios-info/${placeId}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("No hay información extra para este gimnasio:", error);
        return null;
    }
};


 export const obtenerComentariosGimnasio = async (placeId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comentarios/${placeId}`);
        if (!response.ok) {
            if (response.status === 404) return []; 
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("Error al cargar comentarios:", error);
        return []; 
    }
};

export const enviarComentario = async (placeId, usuarioId, texto) => {
    const payload = {
        placeId: placeId,
        usuarioId: usuarioId,
        comentario: texto
    };

    const response = await fetch(`${API_BASE_URL}/api/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
};