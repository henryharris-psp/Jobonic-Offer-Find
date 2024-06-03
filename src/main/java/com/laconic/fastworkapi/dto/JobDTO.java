package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Job;
import com.laconic.fastworkapi.enums.JobStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -3339553155487626483L;
    private UUID id;
    private String title;
    private String description;
    private JobStatus jobStatus;
    private UUID clientId;
    private UUID freelancerId;
    private double budget = 0;
    private String location;
    private String skills;
    private double hourOfCompletion = 0;

    public JobDTO(Job job) {
        this.id = job.getId();
        this.title = job.getDescription();
        this.jobStatus = job.getJobStatus();
        this.clientId = job.getClientId();
        this.freelancerId = job.getFreelancerId();
        this.budget = job.getBudget();
        this.location = job.getLocation();
        this.skills = job.getSkills();
        this.hourOfCompletion = job.getHourOfCompletion();
    }

    public Job updateJob(Job job) {
        job.setTitle(this.title);
        job.setDescription(this.description);
        job.setJobStatus(this.jobStatus);
        job.setClientId(this.clientId);
        job.setFreelancerId(this.freelancerId);
        job.setBudget(this.budget);
        job.setLocation(this.location);
        job.setSkills(this.skills);
        job.setHourOfCompletion(this.hourOfCompletion);
        return job;
    }
}
