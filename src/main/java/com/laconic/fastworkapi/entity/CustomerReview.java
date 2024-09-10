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
public class CustomerReview extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    private double noOfStar = 0.0;

    private String review;

    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "matches_id")
    private Matches matches;

    @Enumerated(EnumType.STRING)
    private ReviewType reviewType;

   public enum ReviewType {
        EMPLOYER,
        FREELANCER
    }
}
