package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.JobStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobMatch extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @OneToOne
    private Service service;
    @OneToOne
    private Profile profile;
    private JobStatus jobStatus;
    private double paymentTotal = 0;
    private int noOfDraftAllowed;
    private int noOfDraftLeft;
    private String draftRequirement;
}
