package com.laconic.fastworkapi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class PayniResponseDTO {
    private String redirectUrl;
    private UUID transactionId;
}
