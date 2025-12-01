package com.gym360.backend.repository;


import com.gym360.backend.model.Oferta;

import org.hibernate.Internal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfertaRepositorio extends JpaRepository<Oferta, Integer> {



}
