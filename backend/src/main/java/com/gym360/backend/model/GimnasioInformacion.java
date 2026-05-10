package com.gym360.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "gimnasios_info")
public class GimnasioInformacion {

    @Id
    @Column(name = "place_id", length = 100)
    private String placeId;

    @Column(length = 50)
    private String tipo;

    @Column(columnDefinition = "TEXT", length = 65535)
    private String servicios;

    @Column(length = 50)
    private String horario;

    private Double precio;

    @Column(columnDefinition = "TEXT", length = 65535) //sin esto da error, ya que la base de datos, que ya esta creada, guarda valores más grandes.
    private String descripcion;

    @Column(length = 30)
    private String ambiente;

    public String getPlaceId() { return placeId; }
    public void setPlaceId(String placeId) { this.placeId = placeId; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getServicios() { return servicios; }
    public void setServicios(String servicios) { this.servicios = servicios; }

    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getAmbiente() { return ambiente; }
    public void setAmbiente(String ambiente) { this.ambiente = ambiente; }
}