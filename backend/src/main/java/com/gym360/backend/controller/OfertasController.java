package com.gym360.backend.controller;


import com.gym360.backend.model.Oferta;
import com.gym360.backend.repository.OfertaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")

public class OfertasController {

    @Autowired
    OfertaRepositorio ofertaRepositorio ;

    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> darOfertas(){

        return ResponseEntity.ok(ofertaRepositorio.findAll());

    }


}
