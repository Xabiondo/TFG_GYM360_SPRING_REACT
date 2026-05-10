package com.gym360.backend.service;

import com.gym360.backend.model.GimnasioInformacion;

import com.gym360.backend.repository.GimnasioInformacionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GimnasioInformacionService {

    @Autowired
    private GimnasioInformacionRepositorio gimnasioInformacionRepositorio;

    public GimnasioInformacion obtenerInfoPorPlaceId(String placeId) {
        Optional<GimnasioInformacion> info = gimnasioInformacionRepositorio.findById(placeId);
        return info.orElse(null); // Devuelve null si ese gimnasio aún no tiene info extra
    }
}