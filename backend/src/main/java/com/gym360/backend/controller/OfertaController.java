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
// 1. AQUÍ ESTÁ EL ARREGLO DE LOS PERMISOS (CORS) PARA DEJARTE BORRAR
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class OfertaController {

    @Autowired
    OfertaService ofertaService;

    @GetMapping
    public ResponseEntity<List<Oferta>> obtenerOfertas() {
        List<Oferta> listaOfertas = ofertaService.obtenerTodas();
        return ResponseEntity.ok(listaOfertas);
    }

    @PostMapping("/votar")
    public ResponseEntity<?> votarOferta(@RequestBody Map<String, Integer> votoUsuario) {

        int ofertaId = votoUsuario.get("ofertaId");
        int usuarioId = votoUsuario.get("usuarioId");
        int valor = votoUsuario.get("valor");

        ofertaService.procesarVoto(usuarioId, ofertaId, valor);

        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Voto guardado");

        return ResponseEntity.ok(respuesta);
    }

    @PostMapping
    public ResponseEntity<Oferta> crearOferta(@RequestBody Oferta oferta) {
        Oferta nuevaOferta = ofertaService.guardarOferta(oferta);
        return ResponseEntity.ok(nuevaOferta);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarOferta(@PathVariable int id) {
        try {
            ofertaService.eliminarOferta(id);
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("mensaje", "Oferta eliminada correctamente");
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar la oferta");
        }
    }
}