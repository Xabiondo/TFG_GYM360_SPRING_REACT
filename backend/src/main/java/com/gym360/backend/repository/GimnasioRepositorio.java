package com.gym360.backend.repository;


import com.gym360.backend.model.Gimnasio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GimnasioRepositorio extends JpaRepository<Gimnasio , String > {

    @Query("SELECT g FROM Gimnasio g WHERE "
            + "(:busqueda IS NULL OR :busqueda = '' OR LOWER(g.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%'))) AND "
            + "(:ubicacion IS NULL OR :ubicacion = '' OR LOWER(g.direccion) LIKE LOWER(CONCAT('%', :ubicacion, '%'))) AND "
            + "(:abiertoAhora IS NULL OR g.abiertoAhora = :abiertoAhora)")
    List<Gimnasio> buscarGimnasiosDinamico(
            @Param("busqueda") String busqueda,
            @Param("ubicacion") String ubicacion,
            @Param("abiertoAhora") Boolean abiertoAhora
    );

}
