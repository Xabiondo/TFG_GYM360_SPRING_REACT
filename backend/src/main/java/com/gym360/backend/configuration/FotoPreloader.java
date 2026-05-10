/*package com.gym360.backend.configuration;

import com.gym360.backend.model.Gimnasio;
import com.gym360.backend.service.GimnasioService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
public class FotoPreloader {

    @Autowired
    private GimnasioService gimnasioService;

    @Value("${google.api.key}")
    private String apiKey;

    @PostConstruct
    public void descargarTodasLasFotos() {
        List<Gimnasio> gimnasios = gimnasioService.obtenerTodosLosGimnasios() ;


        for (Gimnasio gym : gimnasios) {
            try {
                String nombreArchivo = "gym_" + gym.getPlaceId() + ".jpg";
                Path rutaArchivo = Paths.get("src/main/resources/static/images/gimnasios/" + nombreArchivo);

                if (Files.exists(rutaArchivo) || gym.getFotoReferencia() == null) continue;

                String url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference="
                        + gym.getFotoReferencia() + "&key=" + apiKey;

                byte[] imagenBytes = new RestTemplate().getForObject(url, byte[].class);
                Files.createDirectories(rutaArchivo.getParent());
                Files.write(rutaArchivo, imagenBytes);

                gym.setFotoReferencia("/images/gimnasios/" + nombreArchivo);
                gimnasioService.guardarGimnasio(gym); // necesitas e

                System.out.println("✅ Foto guardada: " + nombreArchivo);

            } catch (Exception e) {
                System.out.println("❌ Error con gym " + gym.getPlaceId() + ": " + e.getMessage());
            }
        }
    }
}*/