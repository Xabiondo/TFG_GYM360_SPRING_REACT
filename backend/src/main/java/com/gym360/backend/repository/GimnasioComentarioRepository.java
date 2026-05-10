package com.gym360.backend.repository;

import com.gym360.backend.dto.ComentarioDTO;
import com.gym360.backend.model.GimnasioComentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GimnasioComentarioRepository extends JpaRepository<GimnasioComentario, Long> {

    List<GimnasioComentario> findByPlaceId(String placeId);

    @Query("SELECT new com.gym360.backend.dto.ComentarioDTO(c.id, c.comentario, u.nombre, u.fotoPerfil) " +
            "FROM GimnasioComentario c JOIN Usuario u ON c.usuarioId = u.id " +
            "WHERE c.placeId = :placeId")
    List<ComentarioDTO> findComentariosConUsuario(@Param("placeId") String placeId);
}