const API_URL = "http://localhost:8080/api/progreso";

export const getPesoHistorial = async (userId) => {
    const endpoint = `${API_URL}/peso/${userId}`;
    const respuesta = await fetch(endpoint);
    
    if (!respuesta.ok) {
        throw new Error(`Error del servidor al pedir los pesos: ${respuesta.status}`);
    }
    
    const datosEnJson = await respuesta.json();
    return datosEnJson;
};

// NUEVO: Ahora recibimos la fecha elegida en el calendario
export const registrarPeso = async (userId, peso, fecha) => {
    const datosParaEnviar = {
        usuarioId: userId,
        peso: peso,
        fecha: fecha // Lo añadimos aquí para que viaje al backend
    };

    const opcionesDePeticion = {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(datosParaEnviar) 
    };

    const respuesta = await fetch(`${API_URL}/peso`, opcionesDePeticion);

    if (!respuesta.ok) {
        throw new Error(`Error al guardar el peso: ${respuesta.status}`);
    }

    return respuesta;
};

export const getAsistenciaHistorial = async (userId) => {
    const endpoint = `${API_URL}/asistencia/${userId}`;
    const respuesta = await fetch(endpoint);
        
    if (!respuesta.ok) {
        throw new Error(`Error del servidor al pedir asistencias: ${respuesta.status}`);
    }
        
    const datosEnJson = await respuesta.json();
    return datosEnJson;
};

export const registrarAsistencia = async (userId) => {
    const datosParaEnviar = {
        usuarioId: userId
    };

    const opcionesDePeticion = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(datosParaEnviar)
    };

    const respuesta = await fetch(`${API_URL}/asistencia`, opcionesDePeticion);
    return respuesta;
};