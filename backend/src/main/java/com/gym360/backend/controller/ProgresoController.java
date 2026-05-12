package com.gym360.backend.controller;

import com.gym360.backend.model.UsuarioAsistencia;
import com.gym360.backend.model.UsuarioPeso;
import com.gym360.backend.service.ProgresoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate; // Importante añadir esto
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progreso")
@CrossOrigin(origins = "*")
public class ProgresoController {

    @Autowired
    private ProgresoService progresoService;

    @PostMapping("/peso")
    public ResponseEntity<?> guardarPeso(@RequestBody Map<String, Object> payload) {
        int usuarioId = (Integer) payload.get("usuarioId");
        Double peso = Double.valueOf(payload.get("peso").toString());


        String fechaString = (String) payload.get("fecha");
        LocalDate fecha = LocalDate.parse(fechaString); // La convertimos a LocalDate


        progresoService.registrarPeso(usuarioId, peso, fecha);

        return ResponseEntity.ok(Map.of("mensaje", "Peso registrado correctamente"));
    }

    @GetMapping("/peso/{usuarioId}")
    public ResponseEntity<?> obtenerPesos(@PathVariable int usuarioId) {
        List<UsuarioPeso> historial = progresoService.obtenerHistorialPesos(usuarioId);
        List<Map<String, Object>> respuesta = new ArrayList<>();

        for (UsuarioPeso p : historial) {
            Map<String, Object> map = new HashMap<>();
            map.put("fecha", p.getFecha().toString());
            map.put("peso", p.getPeso());
            respuesta.add(map);
        }
        return ResponseEntity.ok(respuesta);
    }

    @PostMapping("/asistencia")
    public ResponseEntity<?> guardarAsistencia(@RequestBody Map<String, Integer> payload) {
        int usuarioId = payload.get("usuarioId");
        boolean nuevoRegistro = progresoService.registrarAsistencia(usuarioId);

        if (nuevoRegistro) {
            return ResponseEntity.ok(Map.of("mensaje", "¡Día entrenado registrado!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Ya habías registrado tu entreno hoy."));
        }
    }

    @GetMapping("/asistencia/{usuarioId}")
    public ResponseEntity<List<String>> obtenerAsistencias(@PathVariable int usuarioId) {
        List<UsuarioAsistencia> historial = progresoService.obtenerHistorialAsistencia(usuarioId);
        List<String> fechas = new ArrayList<>();

        for (UsuarioAsistencia a : historial) {
            fechas.add(a.getFecha().toString());
        }
        return ResponseEntity.ok(fechas);
    }
}