package com.gym360.backend.dto;

public class VotoRequest {
    private int idUsuario  ;
    private int idOferta ;
    private boolean opinionVoto ;


    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getIdOferta() {
        return idOferta;
    }

    public void setIdOferta(int idOferta) {
        this.idOferta = idOferta;
    }

    public boolean isOpinionVoto() {
        return opinionVoto;
    }

    public void setOpinionVoto(boolean opinionVoto) {
        this.opinionVoto = opinionVoto;
    }
}
