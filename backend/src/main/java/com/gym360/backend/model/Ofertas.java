package com.gym360.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ofertas {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY  )
    private  int id;

    private String titulo  ;

    private String descripcion ;

    private int precio ;

    private  String enlace ;

    private String rutaFoto ;

    private int userId;


}
