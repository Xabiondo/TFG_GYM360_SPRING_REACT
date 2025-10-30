package com.gym360.backend.controller;

import com.gym360.backend.configuration.Configuracion;
import com.gym360.backend.model.Usuario;
import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio ;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<Map<String , Object>>signup(@RequestBody Usuario usuario){
        Map<String , Object> response = new HashMap<>();

        if (usuarioRepositorio.existsByEmail(usuario.getEmail())){
            response.put("success" , false);
            response.put("message" , "email ya registrado ");
            return ResponseEntity.badRequest().body(response);
        }
        String contrasenaEncriptada = passwordEncoder.encode(usuario.getContrasena());
        usuario.setContrasena(contrasenaEncriptada);
        Usuario nuevo = usuarioRepositorio.save(usuario);
        response.put("success" , true) ;
        response.put("message" , "usuario nuevo creado ");
        response.put("id" , nuevo.getId());
        return  ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Usuario usuario) {
        Map<String, Object> response = new HashMap<>();

        Usuario usuarioEnBD = usuarioRepositorio.findByEmail(usuario.getEmail());

        if (usuarioEnBD == null) {
            response.put("success", false);
            response.put("message", "Credenciales inválidas.");
            return ResponseEntity.status(401).body(response);
        }

        if (passwordEncoder.matches(usuario.getContrasena() , usuarioEnBD.getContrasena())) {
            response.put("success", true);
            response.put("message", "Inicio de sesión exitoso.");
            response.put("id", usuarioEnBD.getId());
            response.put("nombre", usuarioEnBD.getNombre());
            response.put("email", usuarioEnBD.getEmail());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Credenciales inválidas.");
            return ResponseEntity.status(401).body(response);
        }
    }
}
