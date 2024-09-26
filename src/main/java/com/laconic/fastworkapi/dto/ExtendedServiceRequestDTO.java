package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.PriceUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExtendedServiceRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 6529685098267757690L;

    @JsonIgnore
    private UUID id;

    private ServiceOfferDTO serviceOfferDTO;
    private ServiceRequestDTO serviceRequestDTO;
    private Long profileId;
    private String title;
    private EmploymentType employmentType;
    private String description;
    private String description1;
    private String description2;
    private String description3;
    private String languageSpoken;
    private String location;
    private UUID categoryId;
    private double price = 0;
    private PriceUnit priceUnit;

    public record WithProfile(UUID id, ServiceOfferDTO serviceOfferDTO, ServiceRequestDTO serviceRequestDTO,
                              ProfileDTO profileDTO, String title, EmploymentType employmentType, String description,
                              String description1, String description2, String description3, String languageSpoken,
                              String location, CategoryDTO categoryDTO, double price,
                              PriceUnit priceUnit) implements Serializable {
    }

//    public record WithProfile(
//            UUID id, LocalDate submissionDeadline, String workExample, Long profileId,
//            String description, String description1, String description2, String description3,
//            EmploymentType employmentType, String languageSpoken, String location, Double price,
//            PriceUnit priceUnit, String title, UUID categoryId, LocalDate cardExpiryDate,
//            String cardNumber, String companyName, String image, String phoneNumber, Double review,
//            Long userId, String walletAddress) implements Serializable {
//
//    }

//    public record WithProfile(UUID id, ServiceOfferDTO serviceOfferDTO, ServiceRequestDTO serviceRequestDTO,
//                              ProfileDTO profileDTO, String title, EmploymentType employmentType, String description,
//                              String description1, String description2, String description3, String languageSpoken,
//                              String location, CategoryDTO categoryDTO, double price,
//                              PriceUnit priceUnit) implements Serializable {
//    }
}
