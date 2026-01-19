package com.gym360.backend.service;

import com.gym360.backend.dto.VotoRequest;
import com.gym360.backend.model.Oferta;
import com.gym360.backend.model.Usuario;
import com.gym360.backend.model.Voto;
import com.gym360.backend.repository.OfertaRepositorio;
import com.gym360.backend.repository.UsuarioRepositorio;
import com.gym360.backend.repository.VotoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VotoService {

    @Autowired
    VotoRepositorio votoRepositorio;

    @Autowired
    OfertaRepositorio ofertaRepositorio;

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public boolean registrarVoto(VotoRequest voto) {


        Boolean haVotado = votoRepositorio.existsByUsuarioIdAndOfertaId(voto.getIdUsuario(), voto.getIdOferta());

        if (haVotado) {
            return false;
        }

        if (voto.isOpinionVoto()) {
            ofertaRepositorio.incrementarPopularidad( voto.getIdOferta());
        } else {
            ofertaRepositorio.disminuirPopularidad( voto.getIdOferta());
        }


        Voto voto1 = new Voto();

        Oferta oferta = ofertaRepositorio.findById( voto.getIdOferta()).get();
        Usuario usuario = usuarioRepositorio.findById( voto.getIdUsuario()).get();

        voto1.setOferta(oferta);
        voto1.setUsuario(usuario);
        voto1.setOpinion(voto.isOpinionVoto());

        votoRepositorio.save(voto1);

        return true;
    }
    public List<Oferta> obtenerOfertas(){
        return  ofertaRepositorio.findAll();

    }
}