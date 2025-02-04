package com.laconic.fastworkapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.dto.UserExperienceDTO;
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
public class UserExperience extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String company;
    private LocalDate startDate;
    private LocalDate endDate;
    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonIgnore
    private Profile profile;
    private boolean isActive = true;

    public UserExperience(UserExperienceDTO userExperienceDTO) {
        this.id = userExperienceDTO.getId();
        this.company = userExperienceDTO.getCompany();
        this.startDate = userExperienceDTO.getStartDate();
        this.endDate = userExperienceDTO.getEndDate();
    }
}
