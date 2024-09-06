package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active = true")
public class Contract extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "matches_id")
    private Matches matches;

    private Double price;

    @Lob
    private String deliverable;
    private Boolean isFreelancerConfirmed;
    private Boolean isEmployerConfirmed;

}

