package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.PaymentMode;
import com.laconic.fastworkapi.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
@Builder
public class Matches extends Auditable<UUID> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceManagement service;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "matches", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Checkpoint> checkpoints;

    @Builder.Default
    private double paymentTotal = 0;

    //    @Builder.Default
//    private int numberOfCheckpoints = 0;
//    @Builder.Default
//    private int numberOfCheckpointsLeft = 0;
    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Enumerated(EnumType.STRING)
    private Status status;
}