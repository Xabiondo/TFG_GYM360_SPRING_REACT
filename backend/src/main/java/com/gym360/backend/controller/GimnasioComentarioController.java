package com.gym360.backend.controller;

import com.gym360.backend.dto.ComentarioDTO;
import com.gym360.backend.model.GimnasioComentario;
import com.gym360.backend.service.GimnasioComentarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class GimnasioComentarioController {

    private final GimnasioComentarioService service;

    public GimnasioComentarioController(GimnasioComentarioService service) {
        this.service = service;
    }


    @GetMapping("/{placeId}")
    public ResponseEntity<List<ComentarioDTO>> obtenerComentarios(@PathVariable String placeId) {
        return ResponseEntity.ok(service.obtenerPorGimnasio(placeId));
    }

    @PostMapping
    public ResponseEntity<ComentarioDTO> crearComentario(@RequestBody GimnasioComentario comentario) {
        return ResponseEntity.ok(service.guardarYRetornarDTO(comentario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}