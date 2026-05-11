package com.gym360.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_dieta")
public class UsuarioDieta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // no estoy guardando las relaciones,de momento
    @Column(name = "usuario_id")
    private Long usuarioId;

    private String nombreDieta;

    @Column(columnDefinition = "TEXT")
    private String caracteristicas;

    @Column(columnDefinition = "TEXT")
    private String lunes;

    @Column(columnDefinition = "TEXT")
    private String martes;

    @Column(columnDefinition = "TEXT")
    private String miercoles;

    @Column(columnDefinition = "TEXT")
    private String jueves;

    @Column(columnDefinition = "TEXT")
    private String viernes;

    @Column(columnDefinition = "TEXT")
    private String sabado;

    @Column(columnDefinition = "TEXT")
    private String domingo;

    public UsuarioDieta() {

    }
    public UsuarioDieta(Long id, Long usuarioId, String nombreDieta, String caracteristicas, String lunes, String martes, String miercoles, String jueves, String viernes, String sabado, String domingo) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.nombreDieta = nombreDieta;
        this.caracteristicas = caracteristicas;
        this.lunes = lunes;
        this.martes = martes;
        this.miercoles = miercoles;
        this.jueves = jueves;
        this.viernes = viernes;
        this.sabado = sabado;
        this.domingo = domingo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNombreDieta() {
        return nombreDieta;
    }

    public void setNombreDieta(String nombreDieta) {
        this.nombreDieta = nombreDieta;
    }

    public String getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(String caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public String getLunes() {
        return lunes;
    }

    public void setLunes(String lunes) {
        this.lunes = lunes;
    }

    public String getMartes() {
        return martes;
    }

    public void setMartes(String martes) {
        this.martes = martes;
    }

    public String getMiercoles() {
        return miercoles;
    }

    public void setMiercoles(String miercoles) {
        this.miercoles = miercoles;
    }

    public String getJueves() {
        return jueves;
    }

    public void setJueves(String jueves) {
        this.jueves = jueves;
    }

    public String getViernes() {
        return viernes;
    }

    public void setViernes(String viernes) {
        this.viernes = viernes;
    }

    public String getSabado() {
        return sabado;
    }

    public void setSabado(String sabado) {
        this.sabado = sabado;
    }

    public String getDomingo() {
        return domingo;
    }

    public void setDomingo(String domingo) {
        this.domingo = domingo;
    }


}