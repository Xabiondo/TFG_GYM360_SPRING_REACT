package com.gym360.backend.controller;

import com.gym360.backend.model.UsuarioDieta;
import com.gym360.backend.service.UsuarioDietaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/nutricion")
public class NutricionController {

    @Autowired
    private UsuarioDietaService usuarioDietaService;

    @GetMapping("/dietas/{usuarioId}")
    public ResponseEntity<List<UsuarioDieta>> obtenerDietas(@PathVariable Integer usuarioId) {
        List<UsuarioDieta> dietas = usuarioDietaService.obtenerDietasPorUsuario(usuarioId);
        return ResponseEntity.ok(dietas);
    }
}