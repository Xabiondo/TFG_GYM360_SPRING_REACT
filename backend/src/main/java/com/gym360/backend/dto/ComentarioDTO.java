package com.gym360.backend.dto;

public class ComentarioDTO {
    private Long id;
    private String comentario;
    private String usuarioNombre;
    private String usuarioFoto;

    public ComentarioDTO(Long id, String comentario, String usuarioNombre, String usuarioFoto) {
        this.id = id;
        this.comentario = comentario;
        this.usuarioNombre = usuarioNombre;
        this.usuarioFoto = usuarioFoto;
    }

    public Long getId() { return id; }
    public String getComentario() { return comentario; }
    public String getUsuarioNombre() { return usuarioNombre; }
    public String getUsuarioFoto() { return usuarioFoto; }
}