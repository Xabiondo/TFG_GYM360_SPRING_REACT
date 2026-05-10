package com.gym360.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "gimnasio_comentarios")
public class GimnasioComentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "place_id", length = 100, nullable = false)
    private String placeId;

    @Column(name = "usuario_id", nullable = false)
    private Integer usuarioId;

    @Column(name = "comentario", columnDefinition = "TEXT", nullable = false)
    private String comentario;

    public GimnasioComentario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlaceId() { return placeId; }
    public void setPlaceId(String placeId) { this.placeId = placeId; }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
}