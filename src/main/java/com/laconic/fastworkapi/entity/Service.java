package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
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
public class Service extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ServiceOffer serviceOffer;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ServiceRequest serviceRequest;
    // client or freelancer profile
    @OneToOne
    private Profile profile;
    private String title;
}
