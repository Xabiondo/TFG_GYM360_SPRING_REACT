package com.gym360.backend.service;

import com.gym360.backend.model.Usuario;
import com.gym360.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Usuario actualizarUsuario(int id, Usuario datosNuevos) {
        Optional<Usuario> usuarioOpt = usuarioRepositorio.findById(id);

        if (usuarioOpt.isPresent()) {
            Usuario usuarioExistente = usuarioOpt.get();


            if (datosNuevos.getNombre() != null) {
                usuarioExistente.setNombre(datosNuevos.getNombre());
            }
            if (datosNuevos.getFotoPerfil() != null) {
                usuarioExistente.setFotoPerfil(datosNuevos.getFotoPerfil());
            }


            return usuarioRepositorio.save(usuarioExistente);
        }
        throw new RuntimeException("Usuario no encontrado con ID: " + id);
    }


    public String guardarFotoPerfil(MultipartFile archivo) throws IOException {

        String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename();


        Path rutaDirectorio = Paths.get("src/main/resources/static/images/user");


        if (!Files.exists(rutaDirectorio)) {
            Files.createDirectories(rutaDirectorio);
        }


        Path rutaArchivo = rutaDirectorio.resolve(nombreArchivo);
        Files.copy(archivo.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

        return nombreArchivo;
    }
}
