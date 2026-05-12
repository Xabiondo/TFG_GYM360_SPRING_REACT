package com.gym360.backend.controller;

import com.gym360.backend.model.Oferta;
import com.gym360.backend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "*")
public class OfertaController {

    @Autowired
    OfertaService ofertaService;

    @GetMapping
    public ResponseEntity<List<Oferta>> obtenerOfertas() {
        // Pedimos todas las ofertas al servicio (asumiendo que tienes este método creado)
        List<Oferta> listaOfertas = ofertaService.obtenerTodas();
        return ResponseEntity.ok(listaOfertas);
    }

    @PostMapping("/votar")
    public ResponseEntity<?> votarOferta(@RequestBody Map<String, Integer> votoUsuario) {

        // Esto saca los datos del paquete JSON que manda React
        int ofertaId = votoUsuario.get("ofertaId");
        int usuarioId = votoUsuario.get("usuarioId");
        int valor = votoUsuario.get("valor");

        // Llamamos a la lógica dura del servicio
        ofertaService.procesarVoto(usuarioId, ofertaId, valor);

        // Devolvemos el OK
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Voto guardado");

        return ResponseEntity.ok(respuesta);
    }
}