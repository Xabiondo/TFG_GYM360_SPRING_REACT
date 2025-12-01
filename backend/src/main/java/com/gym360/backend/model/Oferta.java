package com.gym360.backend.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "oferta")
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

    public Oferta(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public int getPopularidad() {
        return popularidad;
    }

    public void setPopularidad(int popularidad) {
        this.popularidad = popularidad;
    }

    public String getRutaFoto() {
        return rutaFoto;
    }

    public void setRutaFoto(String rutaFoto) {
        this.rutaFoto = rutaFoto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<OfertaComentario> getOfertaComentarios() {
        return ofertaComentarios;
    }

    public void setOfertaComentarios(List<OfertaComentario> ofertaComentarios) {
        this.ofertaComentarios = ofertaComentarios;
    }
}
