package com.gym360.backend.service;

import com.gym360.backend.model.Gimnasio;
import com.gym360.backend.repository.GimnasioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GimnasioService {

    @Autowired
    GimnasioRepositorio gimnasioRepositorio;

    // saca todos los gimnasios de golpe
    public List<Gimnasio> obtenerTodosLosGimnasios() {
        return gimnasioRepositorio.findAll();
    }

    // este es para el gym details
    public Optional<Gimnasio> obtenerGimnasio(String idGimnasio) {
        return gimnasioRepositorio.findById(idGimnasio);
    }
    public Gimnasio guardarGimnasio(Gimnasio gimnasio){
        return gimnasioRepositorio.save(gimnasio) ;
    }

    // funcion para que funcione el buscador con todo lo que le manden
    public List<Gimnasio> busquedaDinamica(String busqueda, String estado, String ubicacion, String operadorPrecio, Double valorPrecio) {

        Boolean abiertoAhora = null;
        if ("abiertos".equalsIgnoreCase(estado)) {
            abiertoAhora = true;
        }

        List<Gimnasio> resultados = gimnasioRepositorio.buscarGimnasiosDinamico(busqueda, ubicacion, abiertoAhora);

        if (valorPrecio != null && operadorPrecio != null && !operadorPrecio.isEmpty()) {

            // creamos una lista vacia para guardar los que nos valen
            List<Gimnasio> gimnasiosFiltradosPorPrecio = new ArrayList<>();

            // miramos los resultados uno a uno
            for (Gimnasio gym : resultados) {

                if (gym.getPrecio() != null) {
                    String operador = operadorPrecio.toLowerCase();

                    // vamos mirando los casos
                    if (operador.equals("menor")) {

                        if (gym.getPrecio() < valorPrecio) {
                            gimnasiosFiltradosPorPrecio.add(gym); // me lo guardo
                        }

                    } else if (operador.equals("mayor")) {

                        if (gym.getPrecio() > valorPrecio) {
                            gimnasiosFiltradosPorPrecio.add(gym);
                        }

                    } else if (operador.equals("igual")) {

                        if (gym.getPrecio().equals(valorPrecio)) {
                            gimnasiosFiltradosPorPrecio.add(gym);
                        }

                    } else {
                        // si pasa algo raro lo guardo igual por si acaso
                        gimnasiosFiltradosPorPrecio.add(gym);
                    }
                }
            }

            // machacamos la lista original con la lista limpia
            resultados = gimnasiosFiltradosPorPrecio;
        }


        return resultados;

    }

}