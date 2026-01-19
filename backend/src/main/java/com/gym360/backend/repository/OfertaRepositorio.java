package com.gym360.backend.repository;


import com.gym360.backend.model.Oferta;

import jakarta.transaction.Transactional;
import org.hibernate.Internal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OfertaRepositorio extends JpaRepository<Oferta, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Oferta o SET o.popularidad = o.popularidad + 1 WHERE o.id = :id")
    void incrementarPopularidad(int id);

    @Modifying
    @Transactional
    @Query("UPDATE Oferta o SET o.popularidad = o.popularidad - 1 WHERE o.id = :id")
    void disminuirPopularidad(int id);



}
