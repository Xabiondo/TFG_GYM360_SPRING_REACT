package com.gym360.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "oferta_comentario")
public class OfertaComentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOfertaComentario;

    private String contenido;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "oferta_id", nullable = false)
    private Oferta oferta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;


}