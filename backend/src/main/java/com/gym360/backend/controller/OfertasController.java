package com.gym360.backend.controller;


import com.gym360.backend.model.Oferta;
import com.gym360.backend.model.Usuario;
import com.gym360.backend.model.Voto;
import com.gym360.backend.repository.OfertaRepositorio;
import com.gym360.backend.repository.UsuarioRepositorio;
import com.gym360.backend.repository.VotoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")

public class OfertasController {

    @Autowired
    OfertaRepositorio ofertaRepositorio ;

    @Autowired
    VotoRepositorio votoRepositorio ;

    @Autowired
    UsuarioRepositorio usuarioRepositorio ;



    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> darOfertas(){

        return ResponseEntity.ok(ofertaRepositorio.findAll());

    }

    /*@PostMapping("/ofertas/popularidad/{id}")
    public ResponseEntity<Boolean> cambiarPopularidad(@PathVariable int idOferta , @RequestBody int idUsuario , @RequestBody Boolean opinion){

        if (votoRepositorio.existsByUsuarioIdAndOfertaId(idUsuario , idOferta)){

            return new ResponseEntity<>(false , HttpStatus.BAD_REQUEST);

        }
        Oferta oferta = ofertaRepositorio.getReferenceById(idOferta);
        Usuario usuario = usuarioRepositorio.getReferenceById(idUsuario);



    }*/


}
