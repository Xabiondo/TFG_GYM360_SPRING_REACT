package com.gym360.backend.controller;


import com.gym360.backend.dto.PromptRequest;

import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/personalTrainer")

public class PersonalTrainerController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @PostMapping("/assesment")
    public ResponseEntity<String> peticionUsuario(@RequestBody PromptRequest prompt){





    }
}
