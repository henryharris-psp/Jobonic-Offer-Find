package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.PriceUnit;
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
@Getter
@Setter
public class ExtendedServiceRequestDTO extends ServiceRequestDTO implements Serializable {
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
    private String address;
    private LocalDate cardExpiryDate;
    private String cardNumber;
    private String companyName;
    private String email;
    private String firstName;
    private String image;
    private String lastName;
    private String phoneNumber;
    private Double review;
    private Long userId;
    private String username;
    private String walletAddress;

    public ExtendedServiceRequestDTO(
            UUID id,
            LocalDate submissionDeadline,
            String workExample,
            Long profileId,
            String description,
            String description1,
            String description2,
            String description3,
            EmploymentType employmentType,
            String languageSpoken,
            String location,
            Double price,
            PriceUnit priceUnit,
            String title,
            UUID categoryId,
            String address,
            LocalDate cardExpiryDate,
            String cardNumber,
            String companyName,
            String email,
            String firstName,
            String image,
            String lastName,
            String phoneNumber,
            Double review,
            Long userId,
            String username,
            String walletAddress
    ) {
        this.id = id;
        this.submissionDeadline = submissionDeadline;
        this.workExample = workExample;
        this.profileId = profileId;
        this.description = description;
        this.description1 = description1;
        this.description2 = description2;
        this.description3 = description3;
        this.employmentType = employmentType;
        this.languageSpoken = languageSpoken;
        this.location = location;
        this.price = price;
        this.priceUnit = priceUnit;
        this.title = title;
        this.categoryId = categoryId;
        this.address = address;
        this.cardExpiryDate = cardExpiryDate;
        this.cardNumber = cardNumber;
        this.companyName = companyName;
        this.email = email;
        this.firstName = firstName;
        this.image = image;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.review = review;
        this.userId = userId;
        this.username = username;
        this.walletAddress = walletAddress;
    }
}
