/*package com.gym360.backend.controller;


import com.gym360.backend.model.Gimnasio;
import com.gym360.backend.service.GimnasioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/gimnasios")
@CrossOrigin("http://localhost:5173") // Esto es para admitir peticiones de ese puerto en concreto
public class GimnasioController {

    @Autowired
    GimnasioService gimnasioService ;

    @GetMapping("")
    public  ResponseEntity<List<Gimnasio>> darGimnasios(){
        return ResponseEntity.ok(gimnasioService.obtenerGimnasios());
    }


}*/



