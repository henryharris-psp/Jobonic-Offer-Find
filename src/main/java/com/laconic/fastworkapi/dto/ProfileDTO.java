package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProfileDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -4565041716760088438L;
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String companyName;
    private String phoneNumber;
    private String image;
    private String cardNumber;
    private LocalDate cardExpiryDate;
    private String walletAddress;
    private double review;
    private Set<UserExperienceDTO> userExperienceList;
    private Set<UserEducationDTO> userEducationList;
    private Set<SkillDTO> skills;
    private Set<UserRoleDTO> roles;

    public ProfileDTO(Profile profile) {
        this.id = profile.getId();
        this.username = profile.getUsername();
        this.email = profile.getEmail();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.companyName = profile.getCompanyName();
        this.phoneNumber = profile.getPhoneNumber();
        this.image = profile.getImage();
        this.cardNumber = profile.getCardNumber();
        this.cardExpiryDate = profile.getCardExpiryDate();
        this.walletAddress = profile.getWalletAddress();
        this.review = profile.getReview();
    }

    public Profile updateUser(Profile profile) {
        profile.setUsername(this.username);
        profile.setEmail(this.email);
        profile.setFirstName(this.firstName);
        profile.setLastName(this.lastName);
        profile.setCompanyName(this.companyName);
        profile.setPhoneNumber(this.phoneNumber);
        profile.setImage(this.image);
        profile.setCardNumber(this.cardNumber);
        profile.setCardExpiryDate(this.cardExpiryDate);
        profile.setWalletAddress(this.walletAddress);
        profile.setReview(this.review);
        return profile;
    }
}
