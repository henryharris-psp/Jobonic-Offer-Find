package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.enums.PaymentType;
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
    private String companyName;
    private String phoneNumber;
    private String image;
    private String cardNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate cardExpiryDate;
    private String walletAddress;
    private Set<UserExperienceDTO> userExperienceList;
    private Set<UserEducationDTO> userEducationList;
    private Set<SkillDTO> skills;
    private Long userId;
//    private Set<UserRoleDTO> roles;

    private String bankAccountNumber;
    private String position;

    private String cryptoType;

    private PaymentType paymentMethod;

    private PaymentType receivePaymentMethod;
    private String description;

    public Profile updateUser(Profile profile) {
//        profile.setUsername(this.username);
//        profile.setEmail(this.email);
//        profile.setFirstName(this.firstName);
//        profile.setLastName(this.lastName);
        profile.setCompanyName(this.companyName);
        profile.setPhoneNumber(this.phoneNumber);
        profile.setImage(this.image);
        profile.setCardNumber(this.cardNumber);
        profile.setCardExpiryDate(this.cardExpiryDate);
        profile.setWalletAddress(this.walletAddress);
        profile.setBankAccountNumber(this.bankAccountNumber);
        profile.setCryptoType(this.cryptoType);
        profile.setPaymentMethod(this.paymentMethod);
        profile.setReceivePaymentMethod(this.receivePaymentMethod);
        profile.setDescription(this.description);
        return profile;
    }
}
