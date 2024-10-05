package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.config.EnvConfig;
import com.laconic.fastworkapi.dto.PayniRequestDTO;
import com.laconic.fastworkapi.dto.PayniResponseDTO;
import com.laconic.fastworkapi.service.IPayniService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PyaniService implements IPayniService {

    private final EnvConfig envConfig;

    @Override
    public PayniResponseDTO createPayment(PayniRequestDTO payniRequestDTO) {
        var url = envConfig.getEnvValue("payniURL");

        RestTemplate restTemplate = new RestTemplate();

        Object response = restTemplate.postForObject(url, payniRequestDTO, Object.class);

        Map<String, Object> responseMap = (Map<String, Object>) response;

        return PayniResponseDTO.builder()
                .redirectUrl(responseMap.get("url").toString())
                .transactionId(UUID.fromString(responseMap.get("transId").toString()))
                .build();
        }
}
