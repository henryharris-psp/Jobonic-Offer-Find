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
    private int draftCount;
    private String title;
    private String workCategory;
    private String employmentType;
    private String descriptionI;
    private String descriptionII;
    private String descriptionIII;
    private double price;
    private String languageSpoken;
    private String location;


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
        this.workCategory = serviceOffer.getWorkCategory();
        this.descriptionI = serviceOffer.getDescriptionI();
        this.descriptionII = serviceOffer.getDescriptionII();
        this.descriptionIII = serviceOffer.getDescriptionIII();
        this.price = serviceOffer.getPrice();
        this.languageSpoken = serviceOffer.getLanguageSpoken();
        this.location = serviceOffer.getLocation();
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
        serviceOffer.setWorkCategory(this.workCategory);
        serviceOffer.setDescriptionI(this.descriptionI);
        serviceOffer.setDescriptionII(this.descriptionII);
        serviceOffer.setDescriptionIII(this.descriptionIII);
        serviceOffer.setPrice(this.price);
        serviceOffer.setLanguageSpoken(this.languageSpoken);
        serviceOffer.setLocation(this.location);
        return serviceOffer;
    }
}
