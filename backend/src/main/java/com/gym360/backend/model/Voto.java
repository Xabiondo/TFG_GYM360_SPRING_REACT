package com.gym360.backend.model;


import jakarta.persistence.*;



@Entity
@Table(name = "Voto" , uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id" , "oferta_id"})
})
public class Voto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @ManyToOne
    @JoinColumn(name = "oferta_id")
    private Oferta oferta ;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private  Usuario usuario ;

    private Boolean opinion ;

    public Voto(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Oferta getOferta() {
        return oferta;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Boolean getOpinion() {
        return opinion;
    }

    public void setOpinion(Boolean opinion) {
        this.opinion = opinion;
    }
}
