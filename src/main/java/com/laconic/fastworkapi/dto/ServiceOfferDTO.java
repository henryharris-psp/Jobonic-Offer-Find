package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.ServiceOffer;
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
public class ServiceOfferDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -3853581697205725074L;
    private UUID id;
    private String description;
    private String bankCardNumber;
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    private String phone;
    private String address;
    private String skills;
    private String experience;
    private int draftCount = 0;
    private String title;
    private double price = 0;

    public ServiceOfferDTO(ServiceOffer serviceOffer) {
        this.id = serviceOffer.getId();
        this.description = serviceOffer.getDescription();
        this.bankCardNumber = serviceOffer.getBankCardNumber();
        this.email = serviceOffer.getEmail();
        this.startDate = serviceOffer.getStartDate();
        this.phone = serviceOffer.getPhone();
        this.address = serviceOffer.getAddress();
        this.draftCount = serviceOffer.getDraftCount();
        this.skills = serviceOffer.getSkills();
        this.experience = serviceOffer.getExperience();
        this.title = serviceOffer.getTitle();
        this.price = serviceOffer.getPrice();
    }

    public ServiceOffer updateServiceOffer(ServiceOffer serviceOffer) {
        serviceOffer.setDescription(this.description);
        serviceOffer.setBankCardNumber(this.bankCardNumber);
        serviceOffer.setEmail(this.email);
        serviceOffer.setStartDate(this.startDate);
        serviceOffer.setPhone(this.phone);
        serviceOffer.setAddress(this.address);
        serviceOffer.setDraftCount(this.draftCount);
        serviceOffer.setSkills(this.skills);
        serviceOffer.setExperience(this.experience);
        serviceOffer.setTitle(this.title);
        serviceOffer.setPrice(this.price);
        return serviceOffer;
    }
}
