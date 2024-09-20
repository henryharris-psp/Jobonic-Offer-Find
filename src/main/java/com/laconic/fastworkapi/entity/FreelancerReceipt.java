package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreelancerReceipt extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private UUID paymentId;

    private LocalDate releaseDate;

    private double releaseAmount;

    private String toAccountNumber;

    private UUID profileId;

    private UUID serviceId;

    private UUID checkPointId;
}
