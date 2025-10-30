package com.gym360.backend.repository;

import com.gym360.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombre(String username);

    Usuario findByEmail(String email);

    boolean existsByEmail(String email);

}