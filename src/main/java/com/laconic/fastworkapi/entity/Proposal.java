package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
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
@Builder
@SQLRestriction("is_active=true")
public class Proposal  extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    private ServiceManagement service;
    @ManyToOne
    private Profile profile;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "serviceId")
    private List<Attachment> attachments;
    private String note;
    @Builder.Default
    private boolean isActive = true;
}
