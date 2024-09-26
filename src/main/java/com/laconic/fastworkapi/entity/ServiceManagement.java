package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.PriceUnit;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
@Builder
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
    private String description;

    @Column(columnDefinition = "CLOB")
    private String description2;

    @Column(columnDefinition = "CLOB")
    private String description3;

    private String languageSpoken;

    private String location;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;

    @Builder.Default
    private double price = 0;

    @Enumerated(EnumType.STRING)
    private PriceUnit priceUnit;

    private boolean isActive = true;
}
