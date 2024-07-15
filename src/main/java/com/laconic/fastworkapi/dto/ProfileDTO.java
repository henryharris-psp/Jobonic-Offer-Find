package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProfileDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -4565041716760088438L;
    private Long id;
    //    private String username;
    //    private String firstName;
    //    private String lastName;
    //    private String email;
    private String companyName;
    private String phoneNumber;
    private String address;
    private String image;
    private String cardNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate cardExpiryDate;
    private String walletAddress;
    private double review;
    private Set<UserExperienceDTO> userExperienceList;
    private Set<UserEducationDTO> userEducationList;
    private Set<SkillDTO> skills;
    private Set<UserRoleDTO> roles;

    public Profile updateUser(Profile profile) {
//        profile.setUsername(this.username);
//        profile.setEmail(this.email);
//        profile.setFirstName(this.firstName);
//        profile.setLastName(this.lastName);
        profile.setCompanyName(this.companyName);
        profile.setPhoneNumber(this.phoneNumber);
        profile.setAddress(this.address);
        profile.setImage(this.image);
        profile.setCardNumber(this.cardNumber);
        profile.setCardExpiryDate(this.cardExpiryDate);
        profile.setWalletAddress(this.walletAddress);
        profile.setReview(this.review);
        return profile;
    }
}
