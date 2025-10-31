package com.gym360.backend.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiServicio {

    private final String geminiApi ;

    public GeminiServicio(@Value("${gemini.api.key}") String geminiApi){
        this.geminiApi = geminiApi;
        System.out.println("se ha cargado la api key");
    }
}
