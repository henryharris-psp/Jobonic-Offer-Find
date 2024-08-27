package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
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
public class ServiceRequest extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private LocalDate submissionDeadline;
    private String workExample;
    @ManyToOne
    @JoinColumn(name = "profileId")
    private Profile profile;
    private boolean isActive = true;

    @OneToOne
    @JoinColumn(name = "SERVICE_MANAGEMENT_ID")
    private ServiceManagement serviceManagement;

}
