package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Freelancer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FreelancerDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -7687163965192081259L;
    private UUID id;
    private String firstName;
    private String lastName;
    private boolean isVerified = false;
    private double rating = 0;
    private double noOfJobs = 0;
    private String company;
    private String skills;
    private double hourlyRate;
    private String degree;
    private double experience;
    private String designation;
    private String accountNumber;
    private String bankName;

    public FreelancerDTO(Freelancer freelancer) {
        this.id = freelancer.getId();
        this.firstName = freelancer.getFirstName();
        this.lastName = freelancer.getLastName();
        this.isVerified = freelancer.isVerified();
        this.rating = freelancer.getRating();
        this.noOfJobs = freelancer.getNoOfJobs();
        this.skills = freelancer.getSkills();
        this.hourlyRate = freelancer.getHourlyRate();
        this.degree = freelancer.getDegree();
        this.experience = freelancer.getExperience();
        this.designation = freelancer.getDesignation();
        this.accountNumber = freelancer.getAccountNumber();
        this.bankName = freelancer.getBankName();
        this.company = freelancer.getCompany();
    }

    public Freelancer updateFreelancer(Freelancer freelancer) {
        freelancer.setFirstName(this.firstName);
        freelancer.setLastName(this.lastName);
        freelancer.setSkills(this.skills);
        freelancer.setHourlyRate(this.hourlyRate);
        freelancer.setDegree(this.degree);
        freelancer.setExperience(this.experience);
        freelancer.setDesignation(this.designation);
        freelancer.setAccountNumber(this.accountNumber);
        freelancer.setBankName(this.bankName);
        freelancer.setCompany(this.company);
        return freelancer;
    }
}
