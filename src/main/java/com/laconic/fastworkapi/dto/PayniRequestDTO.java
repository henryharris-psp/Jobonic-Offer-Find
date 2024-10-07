package com.laconic.fastworkapi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class PayniRequestDTO {
    private String id;
    private String apiSecret;
    private String currencyCode;
    private Double amount;
}
