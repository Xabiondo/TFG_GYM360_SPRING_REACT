package com.gym360.backend.service;


import com.gym360.backend.repository.OfertaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfertaService {

    @Autowired
    OfertaRepositorio ofertaRepositorio ;


    public void buscarVoto(int idUsuario , int idOferta){

    }
}
