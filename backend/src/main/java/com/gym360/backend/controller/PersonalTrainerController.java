package com.gym360.backend.controller;


import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.gym360.backend.dto.PromptRequest;

import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/personalTrainer")

public class PersonalTrainerController {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @PostMapping("/assesment")
    public ResponseEntity<String> peticionUsuario(@RequestBody PromptRequest prompt){

        Client client = Client.builder().apiKey(apiKey).build();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt.getPrompt(),
                        null);

        return ResponseEntity.ok(response.text());


    }
}
