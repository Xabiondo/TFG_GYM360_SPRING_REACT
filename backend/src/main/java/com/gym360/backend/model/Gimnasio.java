package com.gym360.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "gimnasios")
public class Gimnasio {

    @Id
    @Column(name = "place_id", length = 100)
    private String placeId;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "direccion", length = 255)
    private String direccion;


    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @Column(name = "estado_negocio", length = 50)
    private String estadoNegocio;

    @Column(name = "abierto_ahora")
    private Boolean abiertoAhora;

    @Column(name = "puntuacion")
    private Float puntuacion;


    @Column(name = "total_reseñas")
    private Integer totalResenas;

    @Column(name = "tipos", columnDefinition = "TEXT")
    private String tipos;

    @Column(name = "foto_referencia", columnDefinition = "TEXT")
    private String fotoReferencia;

    @Column(name = "categoria_busqueda", length = 50)
    private String categoriaBusqueda;

    @Column(name = "precio")
    private Double precio;


    public Gimnasio() {
    }

    public Gimnasio(String placeId, String nombre, String direccion, Double latitud, Double longitud, String estadoNegocio, Boolean abiertoAhora, Float puntuacion, Integer totalResenas,
                    String tipos, String fotoReferencia, String categoriaBusqueda , Double precio) {
        this.placeId = placeId;
        this.nombre = nombre;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.estadoNegocio = estadoNegocio;
        this.abiertoAhora = abiertoAhora;
        this.puntuacion = puntuacion;
        this.totalResenas = totalResenas;
        this.tipos = tipos;
        this.fotoReferencia = fotoReferencia;
        this.categoriaBusqueda = categoriaBusqueda;
        this.precio = precio ;
    }




    public String getPlaceId() { return placeId; }
    public void setPlaceId(String placeId) { this.placeId = placeId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Double getLatitud() { return latitud; }
    public void setLatitud(Double latitud) { this.latitud = latitud; }

    public Double getLongitud() { return longitud; }
    public void setLongitud(Double longitud) { this.longitud = longitud; }

    public String getEstadoNegocio() { return estadoNegocio; }
    public void setEstadoNegocio(String estadoNegocio) { this.estadoNegocio = estadoNegocio; }

    public Boolean getAbiertoAhora() { return abiertoAhora; }
    public void setAbiertoAhora(Boolean abiertoAhora) { this.abiertoAhora = abiertoAhora; }

    public Float getPuntuacion() { return puntuacion; }
    public void setPuntuacion(Float puntuacion) { this.puntuacion = puntuacion; }

    public Integer getTotalResenas() { return totalResenas; }
    public void setTotalResenas(Integer totalResenas) { this.totalResenas = totalResenas; }

    public String getTipos() { return tipos; }
    public void setTipos(String tipos) { this.tipos = tipos; }

    public String getFotoReferencia() { return fotoReferencia; }
    public void setFotoReferencia(String fotoReferencia) { this.fotoReferencia = fotoReferencia; }

    public String getCategoriaBusqueda() { return categoriaBusqueda; }
    public void setCategoriaBusqueda(String categoriaBusqueda) { this.categoriaBusqueda = categoriaBusqueda; }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}