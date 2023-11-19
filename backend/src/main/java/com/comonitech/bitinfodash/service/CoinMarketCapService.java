package com.comonitech.bitinfodash.service;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.comonitech.bitinfodash.config.CoinMarketCapProperties;

@Service
public class CoinMarketCapService {

    @Autowired
    private CoinMarketCapProperties coinMarketCapProperties;

    public String getBitcoinInfo() {
        RestTemplate restTemplate = new RestTemplate();

        String apiUrl = coinMarketCapProperties.getApiUrl();
        String apiKey = coinMarketCapProperties.getApiKey();
        String symbol = coinMarketCapProperties.getSymbol();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, "application/json");
        headers.set("X-CMC_PRO_API_KEY", apiKey);

        URI uri = UriComponentsBuilder.fromUriString(apiUrl + "/cryptocurrency/quotes/latest")
                .queryParam("symbol", symbol).build().toUri();

        var requestEntity = new org.springframework.http.HttpEntity<>(headers);  
        ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, String.class);  
        return responseEntity.getBody();
    }
}
