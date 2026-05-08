package com.gym360.backend.service;

import com.gym360.backend.model.Gimnasio;
import com.gym360.backend.repository.GimnasioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public class GimnasioService {

    @Autowired
    GimnasioRepositorio gimnasioRepositorio ;

    public List<Gimnasio> obtenerGimnasios(){
        return gimnasioRepositorio.findAll() ;
    }

    public Optional<Gimnasio> obtenerGimnasio(@RequestParam String idGimnasio){

        return  gimnasioRepositorio.findById(idGimnasio) ;
    }
}
