package com.gym360.backend.service;


import com.gym360.backend.model.Oferta;
import com.gym360.backend.model.Voto;
import com.gym360.backend.repository.OfertaRepositorio;
import com.gym360.backend.repository.VotoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComentarioService {

    @Autowired
    OfertaRepositorio ofertaRepositorio ;


}
