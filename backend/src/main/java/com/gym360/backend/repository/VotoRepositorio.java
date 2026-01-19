package com.gym360.backend.repository;


import com.gym360.backend.model.Oferta;
import com.gym360.backend.model.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotoRepositorio extends JpaRepository<Voto, Long> {

    boolean existsByUsuarioIdAndOfertaId(int usuarioId, int ofertaId);

    Oferta findByUsuarioIdAndOfertaId(int usuarioID , int ofertaID);






}
