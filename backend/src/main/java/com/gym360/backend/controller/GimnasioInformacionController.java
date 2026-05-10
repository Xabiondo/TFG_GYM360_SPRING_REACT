package com.gym360.backend.controller;

import com.gym360.backend.model.GimnasioInformacion;
import com.gym360.backend.service.GimnasioInformacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gimnasios-info")
@CrossOrigin(origins = "http://localhost:5173")
public class GimnasioInformacionController {

    @Autowired
    private GimnasioInformacionService service;

    @GetMapping("/{placeId}")
    public ResponseEntity<GimnasioInformacion> getInformacion(@PathVariable String placeId) {
        GimnasioInformacion info = service.obtenerInfoPorPlaceId(placeId);

        if (info != null) {
            return ResponseEntity.ok(info);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}