package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
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
public class Checkpoint extends Auditable<UUID> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceManagement service;
    @Builder.Default
    private double price = 0;
    private int numberOfHoursCompleted;
    @Column(columnDefinition = "CLOB")
    private String description;
}