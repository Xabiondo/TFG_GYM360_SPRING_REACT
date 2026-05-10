package com.gym360.backend.controller;

import com.gym360.backend.model.Gimnasio;
import com.gym360.backend.service.GimnasioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/gimnasios")
@CrossOrigin("http://localhost:5173") // Esto es para admitir peticiones de ese puerto en concreto
public class GimnasioController {

    @Autowired
    GimnasioService gimnasioService;



    @GetMapping("")
    public ResponseEntity<List<Gimnasio>> darGimnasios(
            @RequestParam(required = false) String busqueda,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String ubicacion,
            @RequestParam(required = false) String operadorPrecio,
            @RequestParam(required = false) Double valorPrecio
    ) {
        List<Gimnasio> resultados;


        boolean hayFiltros = (busqueda != null && !busqueda.isEmpty()) ||
                (estado != null && !estado.equals("todos")) ||
                (ubicacion != null && !ubicacion.isEmpty()) ||
                (valorPrecio != null);

        if (hayFiltros) {

            resultados = gimnasioService.busquedaDinamica(busqueda, estado, ubicacion, operadorPrecio, valorPrecio);
        } else {
            // si entra por primera vez y la barra de busqueda esta vacia, devolvemos todos
            resultados = gimnasioService.obtenerTodosLosGimnasios();
        }

        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gimnasio> darGimnasioPorId(@PathVariable String id) {

        Optional<Gimnasio> gym = gimnasioService.obtenerGimnasio(id);

        // miramos si lo ha encontrado en la base de datos
        if (gym.isPresent()) {
            return ResponseEntity.ok(gym.get());
        } else {
            return ResponseEntity.notFound().build(); // no existe, devolvemos error 404
        }
    }

}