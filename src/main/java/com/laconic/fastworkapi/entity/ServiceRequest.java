package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.WorkCategory;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private WorkCategory workCategory;
    private EmploymentType employmentType;
    private String description1;
    private String description2;
    private String description3;
    private LocalDate submissionDeadline;
    private double budget = 0;
    private String workExample;
    private String languageSpoken;
    private String location;
}
