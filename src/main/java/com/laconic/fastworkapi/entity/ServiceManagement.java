package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.EmploymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
public class ServiceManagement extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ServiceOffer serviceOffer;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ServiceRequest serviceRequest;
    // client or freelancer profile
    @ManyToOne
    @JoinColumn(name = "profileId")
    private Profile profile;
    private String title;
    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;
    @Column(columnDefinition = "CLOB")
    private String description1;
    @Column(columnDefinition = "CLOB")
    private String description2;
    @Column(columnDefinition = "CLOB")
    private String description3;
    private String languageSpoken;
    private String location;
    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;
    private boolean isActive = true;
}
