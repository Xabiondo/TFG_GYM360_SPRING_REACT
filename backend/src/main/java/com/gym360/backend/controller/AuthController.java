package com.gym360.backend.controller;


import com.gym360.backend.model.Usuario;
import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio ;

    @PostMapping("/signup")
    public ResponseEntity<Map<String , Object>>signup(@RequestBody Usuario usuario){
        Map<String , Object> response = new HashMap<>();

        if (usuarioRepositorio.existsByEmail(usuario.getEmail())){
            response.put("success" , false);
            response.put("message" , "email ya registrado ");
            return ResponseEntity.badRequest().body(response);
        }
        Usuario nuevo = usuarioRepositorio.save(usuario);
        response.put("success" , true) ;
        response.put("message" , "usuario nuevo creado ");
        response.put("id" , nuevo.getId());
        return  ResponseEntity.ok(response);
    }




}
