package com.laconic.fastworkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -8805087936102565403L;
    private UUID id;
    private ServiceOfferDTO serviceOfferDTO;
    private ServiceRequestDTO serviceRequestDTO;
    private UUID profileId;
    private String title;

    public record WithProfile(UUID id, ServiceOfferDTO serviceOfferDTO, ServiceRequestDTO serviceRequestDTO,
                              ProfileDTO profileDTO, String title) implements Serializable {}
}
