package com.gym360.backend.controller;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.gym360.backend.dto.PromptRequest;
import com.gym360.backend.model.UsuarioDieta;
import com.gym360.backend.service.UsuarioDietaService;

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
    private UsuarioDietaService usuarioDietaService;


    @PostMapping("/assesment")
    public ResponseEntity<String> peticionUsuario(@RequestBody PromptRequest prompt){

        Client client = Client.builder().apiKey(apiKey).build();

        // aqui editamos el promit, para que devuelva algo que podamos adaptar fácilmente a nuestra tabla
        String promptEnriquecido = "Actúa como un entrenador personal y nutricionista experto. " +
                "El usuario te pide lo siguiente: '" + prompt.getPrompt() + "'. " +
                "IMPORTANTE: Debes responder ÚNICAMENTE con un objeto JSON válido. No incluyas texto antes ni después, ni uses bloques de código markdown (```json). " +
                "El JSON debe tener EXACTAMENTE esta estructura: " +
                "{\"nombreDieta\": \"Nombre creativo de la dieta\", \"caracteristicas\": \"Resumen de macros y objetivos\", \"lunes\": \"Desayuno, Comida, Cena...\", \"martes\": \"...\", \"miercoles\": \"...\", \"jueves\": \"...\", \"viernes\": \"...\", \"sabado\": \"...\", \"domingo\": \"...\"}";

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        promptEnriquecido,
                        null);


        return ResponseEntity.ok(response.text());
    }


    @PostMapping("/save")
    public ResponseEntity<String> guardarPlan(@RequestBody UsuarioDieta dietaRequest){

        usuarioDietaService.guardarDieta(dietaRequest);
        return ResponseEntity.ok("Plan guardado correctamente en la BD");
    }
}