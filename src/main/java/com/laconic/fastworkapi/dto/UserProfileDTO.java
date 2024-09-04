package com.laconic.fastworkapi.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDTO {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String companyName;
    private String phoneNumber;
    private String address;
    private String image;
    private String cardNumber;
    private LocalDate cardExpiryDate;
    private String walletAddress;
    private Integer numReviews;
    private List<UserExperienceDTO> userExperienceList;
    private List<UserEducationDTO> userEducationList;
    private List<SkillDTO> skills;
    private Long userId;
}


