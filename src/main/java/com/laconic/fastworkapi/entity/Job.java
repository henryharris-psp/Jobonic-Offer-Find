package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.dto.JobDTO;
import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.JobStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active = true")
public class Job extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    @Column(columnDefinition = "CLOB")
    private String description;
    private JobStatus jobStatus;
    private UUID clientId;
    private UUID freelancerId;
    private double budget = 0;
    private String location;
    private String skills;
    private double hourOfCompletion = 0;
    private boolean isActive = true;

    public Job(JobDTO jobDTO) {
        this.id = jobDTO.getId();
        this.title = jobDTO.getDescription();
        this.jobStatus = jobDTO.getJobStatus();
        this.clientId = jobDTO.getClientId();
        this.freelancerId = jobDTO.getFreelancerId();
        this.budget = jobDTO.getBudget();
        this.location = jobDTO.getLocation();
        this.skills = jobDTO.getSkills();
        this.hourOfCompletion = jobDTO.getHourOfCompletion();
    }
}
