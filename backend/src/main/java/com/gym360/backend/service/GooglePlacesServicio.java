package com.gym360.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class GooglePlacesServicio {

    //Aquí va, básicamente, una referencia a la api key, para que no se pueda ver

    @Value("${google.places.api.key}")
    private String apiKey;

    //Este es el endpoint de la api que quiero llamar(dar información de los gimnasios cercanos. )

    private static final String NEARBY_SEARCH_URL =
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    public Map<String, Object> buscarGimnasiosCercanos(double lat, double lng) {
        String url = String.format(
                "%s?location=%f,%f&radius=5000&type=gym&key=%s",
                NEARBY_SEARCH_URL, lat, lng, apiKey
        );


        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Map.class);
    }
}