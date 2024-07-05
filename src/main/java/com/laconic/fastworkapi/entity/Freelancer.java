package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.dto.FreelancerDTO;
import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Freelancer extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String firstName;
    private String lastName;
    private boolean isVerified = false;
    private double rating = 0;
    private double noOfJobs = 0;
    private String company;
    private String skills;
    private double hourlyRate = 0;
    private String degree;
    private double experience = 0;
    private String designation;
    private String accountNumber;
    private String bankName;
    private boolean isActive = true;
    
    public Freelancer(FreelancerDTO freelancerDTO) {
        this.id = freelancerDTO.getId();
        this.firstName = freelancerDTO.getFirstName();
        this.lastName = freelancerDTO.getLastName();
        this.isVerified = freelancerDTO.isVerified();
        this.rating = freelancerDTO.getRating();
        this.noOfJobs = freelancerDTO.getNoOfJobs();
        this.skills = freelancerDTO.getSkills();
        this.hourlyRate = freelancerDTO.getHourlyRate();
        this.degree = freelancerDTO.getDegree();
        this.experience = freelancerDTO.getExperience();
        this.designation = freelancerDTO.getDesignation();
        this.accountNumber = freelancerDTO.getAccountNumber();
        this.bankName = freelancerDTO.getBankName();
        this.company = freelancerDTO.getCompany();
        
    }
}
