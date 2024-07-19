package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
public class ServiceOffer extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String description;
    private String bankCardNumber;
    private String email;
    private LocalDate startDate;
    private String phone;
    private String address;
    private String skills;
    private String experience;
    private String title;
    private String workCategory;
    private String employmentType;
    private String descriptionI;
    private String descriptionII;
    private String descriptionIII;
    private double price;
    private String languageSpoken;
    private String location;

    private int draftCount;
    private boolean isActive = true;
}
