


export const obtenerGimnasios = async (filtros = {}) => {

      const url = new URL("http://localhost:8080/api/gimnasios");

  const { 
    busqueda, 
    filtroAbierto, 
    filtroUbicacion, 
    operadorPrecio, 
    valorPrecio 
  } = filtros;

  // Empezamos con la URL base


  if (busqueda) url.searchParams.append("busqueda", busqueda);
  
  if (filtroAbierto && filtroAbierto !== "todos") {
    url.searchParams.append("estado", filtroAbierto); // 'abiertos'
  }
  
  if (filtroUbicacion && filtroUbicacion !== "todas") {
    url.searchParams.append("ubicacion", filtroUbicacion);
  }


  if (valorPrecio) {
    url.searchParams.append("operadorPrecio", operadorPrecio);
    url.searchParams.append("valorPrecio", valorPrecio);
  }

  try {
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de ofertas:", error);
    throw error; 
  }
};
export const iniciarGimnasios =  async () =>{

      const url = new URL("http://localhost:8080/api/gimnasios");

    try{
    const response = await fetch(url.toString(), {

        method : 'GET' , 
        headers:{
            'Content-Type' : 'application/json'
        }
    });
        if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en los gimnasios", error);
    throw error; 
  }




}