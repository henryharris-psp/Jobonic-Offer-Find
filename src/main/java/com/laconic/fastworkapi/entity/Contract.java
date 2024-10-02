package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
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

    @ElementCollection
    private List<Long> acceptBy;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    private boolean isActive = true;

    @OneToOne
    @JoinColumn(name = "current_checkpoint_id")
    private Checkpoint currentCheckpoint;
}

