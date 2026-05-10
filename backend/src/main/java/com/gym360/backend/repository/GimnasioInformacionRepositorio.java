package com.gym360.backend.repository;

import com.gym360.backend.model.GimnasioInformacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GimnasioInformacionRepositorio extends JpaRepository<GimnasioInformacion, String> {
    // de aqui solo queremos el buscar por un id
}