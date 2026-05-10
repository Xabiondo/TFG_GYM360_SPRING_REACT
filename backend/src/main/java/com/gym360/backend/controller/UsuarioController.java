package com.gym360.backend.controller;

import com.gym360.backend.model.Usuario;
import com.gym360.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable int id, @RequestBody Usuario datos) {
        try {
            Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, datos);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping("/foto")
    public ResponseEntity<Map<String, String>> subirFoto(
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("userId") int userId) {
        try {

            String nombreArchivo = usuarioService.guardarFotoPerfil(foto);

            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("nombreArchivo", nombreArchivo);

            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}