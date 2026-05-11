package com.gym360.backend.service;

import com.gym360.backend.model.UsuarioDieta;
import com.gym360.backend.repository.UsuarioDietaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDietaService {

    @Autowired
    private UsuarioDietaRepository usuarioDietaRepository;

    public UsuarioDieta guardarDieta(UsuarioDieta dieta) {
        return usuarioDietaRepository.save(dieta);
    }
}