package com.gym360.backend.service;

import com.gym360.backend.model.Oferta;
import com.gym360.backend.model.Usuario;
import com.gym360.backend.model.UsuarioVotoOferta;
import com.gym360.backend.repository.OfertaRepositorio;

import com.gym360.backend.repository.UsuarioRepositorio;
import com.gym360.backend.repository.UsuarioVotoOfertaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfertaService {

    @Autowired
    private OfertaRepositorio ofertaRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UsuarioVotoOfertaRepository votoRepository;

    public List<Oferta> obtenerTodas() {
        return ofertaRepositorio.findAll();
    }

    @Transactional
    public void procesarVoto(int usuarioId, int ofertaId, int valorNuevo) {

        // 1. Buscamos al usuario y la oferta
        Usuario usuario = usuarioRepositorio.findById(usuarioId).orElseThrow();
        Oferta oferta = ofertaRepositorio.findById(ofertaId).orElseThrow();

        Optional<UsuarioVotoOferta> votoAnteriorOpt = votoRepository.findByUsuarioIdAndOfertaId(usuarioId, ofertaId);


        if (valorNuevo == 3) {
            if (votoAnteriorOpt.isPresent()) {
                UsuarioVotoOferta votoViejoObj = votoAnteriorOpt.get();
                int valorViejo = votoViejoObj.getValor();

                if (valorViejo == 1) {
                    oferta.setPopularidad(oferta.getPopularidad() - 1);
                }
                else if (valorViejo == 2) {
                    oferta.setPopularidad(oferta.getPopularidad() + 1);
                }
                votoRepository.delete(votoViejoObj);
                ofertaRepositorio.save(oferta);
            }
        }

        else {
            if (votoAnteriorOpt.isPresent()) {

                UsuarioVotoOferta votoViejoObj = votoAnteriorOpt.get();
                int valorViejo = votoViejoObj.getValor();


                if (valorViejo != valorNuevo) {


                    if (valorViejo == 1 && valorNuevo == 2) {
                        oferta.setPopularidad(oferta.getPopularidad() - 2);
                    }

                    else if (valorViejo == 2 && valorNuevo == 1) {
                        oferta.setPopularidad(oferta.getPopularidad() + 2);
                    }

                    votoViejoObj.setValor(valorNuevo);
                    votoRepository.save(votoViejoObj);
                    ofertaRepositorio.save(oferta);
                }
            } else {

                UsuarioVotoOferta nuevoVoto = new UsuarioVotoOferta();
                nuevoVoto.setUsuario(usuario);
                nuevoVoto.setOferta(oferta);
                nuevoVoto.setValor(valorNuevo);


                if (valorNuevo == 1) {
                    oferta.setPopularidad(oferta.getPopularidad() + 1);
                } else if (valorNuevo == 2) {
                    oferta.setPopularidad(oferta.getPopularidad() - 1);
                }

                votoRepository.save(nuevoVoto);
                ofertaRepositorio.save(oferta);
            }
        }
    }
}