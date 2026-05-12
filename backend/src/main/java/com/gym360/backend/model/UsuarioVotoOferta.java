package com.gym360.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_voto_oferta")
public class UsuarioVotoOferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Relación con la Oferta
    @ManyToOne
    @JoinColumn(name = "oferta_id")
    private Oferta oferta;

    private int valor;
    // Esto solo tomará valores del 1 al 3 , nulo , positivo , negativo

    public UsuarioVotoOferta() {
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Oferta getOferta() { return oferta; }
    public void setOferta(Oferta oferta) { this.oferta = oferta; }

    public int getValor() { return valor; }
    public void setValor(int valor) { this.valor = valor; }
}