package com.gym360.backend.repository;

import com.gym360.backend.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepositorio extends CrudRepository<Usuario, Integer> {

    Usuario findByEmail(String email);

    boolean existsByEmail(String email);
    
}