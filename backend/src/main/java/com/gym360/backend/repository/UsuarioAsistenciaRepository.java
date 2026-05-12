package com.gym360.backend.repository;

import com.gym360.backend.model.UsuarioAsistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UsuarioAsistenciaRepository extends JpaRepository<UsuarioAsistencia, Integer> {

    boolean existsByUsuarioIdAndFecha(int usuarioId, LocalDate fecha);


    List<UsuarioAsistencia> findByUsuarioIdOrderByFechaAsc(int usuarioId);
}