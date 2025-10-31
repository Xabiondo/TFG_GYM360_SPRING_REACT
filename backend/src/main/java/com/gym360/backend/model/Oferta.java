package com.gym360.backend.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ofertas")
public class Oferta {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY  )
    private  int id;

    private String titulo  ;

    private String descripcion ;

    private int precio ;

    private  String enlace ;

    private int popularidad ;

    private String rutaFoto ;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "oferta")
    private List<OfertaComentario> ofertaComentarios;


}
