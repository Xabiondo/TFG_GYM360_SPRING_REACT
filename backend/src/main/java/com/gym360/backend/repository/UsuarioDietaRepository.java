package com.gym360.backend.repository;

import com.gym360.backend.model.UsuarioDieta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioDietaRepository extends JpaRepository<UsuarioDieta, Integer> {

    List<UsuarioDieta> findByUsuarioId(Integer usuarioId);
}