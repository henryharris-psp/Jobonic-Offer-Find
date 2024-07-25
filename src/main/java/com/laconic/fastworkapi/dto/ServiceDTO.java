package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.enums.EmploymentType;
import jakarta.persistence.Column;
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
    private Long profileId;
    private String title;
    private EmploymentType employmentType;
    @Column(columnDefinition = "CLOB")
    private String description1;
    @Column(columnDefinition = "CLOB")
    private String description2;
    @Column(columnDefinition = "CLOB")
    private String description3;
    private String languageSpoken;
    private String location;
    private UUID categoryId;

    public record WithProfile(UUID id, ServiceOfferDTO serviceOfferDTO, ServiceRequestDTO serviceRequestDTO,
                              ProfileDTO profileDTO, String title, EmploymentType employmentType, String description1,
                              String description2, String description3, String languageSpoken, String location,
                              CategoryDTO categoryDTO) implements Serializable {
    }
}
