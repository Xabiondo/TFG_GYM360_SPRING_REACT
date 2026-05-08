package com.gym360.backend.repository;


import com.gym360.backend.model.Gimnasio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GimnasioRepositorio extends JpaRepository<Gimnasio , String > {

}
