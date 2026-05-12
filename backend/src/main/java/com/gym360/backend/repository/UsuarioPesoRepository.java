package com.gym360.backend.repository;

import com.gym360.backend.model.UsuarioPeso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioPesoRepository extends JpaRepository<UsuarioPeso, Integer> {

    Optional<UsuarioPeso> findByUsuarioIdAndFecha(int usuarioId, LocalDate fecha);

    List<UsuarioPeso> findByUsuarioIdOrderByFechaAsc(int usuarioId);
}