package com.gym360.backend.service;

import com.gym360.backend.dto.ComentarioDTO;
import com.gym360.backend.model.GimnasioComentario;
import com.gym360.backend.model.Usuario;
import com.gym360.backend.repository.GimnasioComentarioRepository;
import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GimnasioComentarioService {

    private final GimnasioComentarioRepository repository;

    @Autowired
    UsuarioRepositorio usuarioRepositorio ;

    public GimnasioComentarioService(GimnasioComentarioRepository repository) {
        this.repository = repository;
    }

    public List<ComentarioDTO> obtenerPorGimnasio(String placeId) {
        return repository.findComentariosConUsuario(placeId);
    }

    public GimnasioComentario guardar(GimnasioComentario comentario) {
        return repository.save(comentario);
    }
    public ComentarioDTO guardarYRetornarDTO(GimnasioComentario comentario) {
        GimnasioComentario guardado = repository.save(comentario);
        // Buscamos el usuario para rellenar nombre y foto
        Usuario u = usuarioRepositorio.findById(guardado.getUsuarioId()).orElseThrow();
        return new ComentarioDTO(guardado.getId(), guardado.getComentario(), u.getNombre(), u.getFotoPerfil());
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}