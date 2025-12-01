package com.gym360.backend.service;


import com.gym360.backend.repository.VotoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VotoService {

    @Autowired
    VotoRepositorio votoRepositorio ;

    public Boolean buscarVoto(int idUsuario , int idOferta){

        return  votoRepositorio.existsByUsuarioIdAndOfertaId(idUsuario , idOferta);


    }
}
