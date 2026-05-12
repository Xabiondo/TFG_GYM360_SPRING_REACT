package com.gym360.backend.service;

import com.gym360.backend.model.Usuario;
import com.gym360.backend.model.UsuarioPeso;
import com.gym360.backend.repository.UsuarioPesoRepository;
import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProgresoService {

    @Autowired
    private UsuarioPesoRepository pesoRepository;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;


    public void registrarPeso(int usuarioId, Double peso, LocalDate fecha) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));


        Optional<UsuarioPeso> registroDeEseDia = pesoRepository.findByUsuarioIdAndFecha(usuarioId, fecha);

        if (registroDeEseDia.isPresent()) {

            UsuarioPeso p = registroDeEseDia.get();
            p.setPeso(peso);
            pesoRepository.save(p);
        } else {

            UsuarioPeso nuevoPeso = new UsuarioPeso();
            nuevoPeso.setUsuario(usuario);
            nuevoPeso.setPeso(peso);
            nuevoPeso.setFecha(fecha);
            pesoRepository.save(nuevoPeso);
        }
    }

    public List<UsuarioPeso> obtenerHistorialPesos(int usuarioId) {
        return pesoRepository.findByUsuarioIdOrderByFechaAsc(usuarioId);
    }


}