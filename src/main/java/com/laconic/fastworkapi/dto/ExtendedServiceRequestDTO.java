package com.laconic.fastworkapi.dto;

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

/**
 * @Author : soe
 * @CreatedAt : Aug 27, 2024
 * @Note : This is an extended DTO for Service Requests with additional details.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExtendedServiceRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 6529685098267757690L;

    private UUID id;
    private LocalDate submissionDeadline;
    private String workExample;
    private Long profileId;
    private String description;
    private String description1;
    private String description2;
    private String description3;
    private EmploymentType employmentType;
    private String languageSpoken;
    private String location;
    private Double price;
    private PriceUnit priceUnit;
    private String title;
    private UUID categoryId;
    private LocalDate cardExpiryDate;
    private String cardNumber;
    private String companyName;
    private String image;
    private String phoneNumber;
    private Double review;
    private Long userId;
    private String walletAddress;

//    public record WithProfile(
//            UUID id, LocalDate submissionDeadline, String workExample, Long profileId,
//            String description, String description1, String description2, String description3,
//            EmploymentType employmentType, String languageSpoken, String location, Double price,
//            PriceUnit priceUnit, String title, UUID categoryId, LocalDate cardExpiryDate,
//            String cardNumber, String companyName, String image, String phoneNumber, Double review,
//            Long userId, String walletAddress) implements Serializable {
//
//    }

    public record WithProfile(UUID id, ServiceOfferDTO serviceOfferDTO, ServiceRequestDTO serviceRequestDTO,
                              ProfileDTO profileDTO, String title, EmploymentType employmentType, String description,
                              String description1, String description2, String description3, String languageSpoken,
                              String location, CategoryDTO categoryDTO, double price,
                              PriceUnit priceUnit) implements Serializable {
    }
}
