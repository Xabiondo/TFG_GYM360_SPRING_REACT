const API_URL = "http://localhost:8080/api/ofertas";

// 1. Pedir todas las ofertas a Java
export const obtenerOfertas = async () => {
    const respuesta = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!respuesta.ok) {
        throw new Error("Error al pedir las ofertas al servidor");
    }

    const datosEnJson = await respuesta.json();
    return datosEnJson;
};


export const votarOferta = async (usuarioId, ofertaId, valorNuevo) => {
    
    const datosVoto = {
        usuarioId: usuarioId,
        ofertaId: ofertaId,
        valor: valorNuevo
    };

    const opcionesDePeticion = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosVoto)
    };

    const respuesta = await fetch(API_URL + "/votar", opcionesDePeticion);

    if (!respuesta.ok) {
        throw new Error("Error al guardar el voto");
    }

    return respuesta;
};