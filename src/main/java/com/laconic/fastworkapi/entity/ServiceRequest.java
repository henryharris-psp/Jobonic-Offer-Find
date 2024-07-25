package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.WorkCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
@Builder
public class ServiceRequest extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Enumerated(EnumType.STRING)
    private WorkCategory workCategory;
    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;
    private String description1;
    private String description2;
    private String description3;
    private LocalDate submissionDeadline;
    @Builder.Default
    private double budget = 0;
    private String workExample;
    private String languageSpoken;
    private String location;
    private boolean isActive = true;
}
