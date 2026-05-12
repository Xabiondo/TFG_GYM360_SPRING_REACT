package com.gym360.backend.repository;

import com.gym360.backend.model.UsuarioVotoOferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioVotoOfertaRepository extends JpaRepository<UsuarioVotoOferta, Integer> {


    Optional<UsuarioVotoOferta> findByUsuarioIdAndOfertaId(int usuarioId, int ofertaId);
}