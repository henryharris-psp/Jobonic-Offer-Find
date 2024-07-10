package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.ServiceRequest;
import com.laconic.fastworkapi.enums.EmploymentType;
import com.laconic.fastworkapi.enums.WorkCategory;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -1614326500232746332L;
    private UUID id;
    private WorkCategory workCategory;
    private EmploymentType employmentType;
    @Column(columnDefinition = "CLOB")
    private String description1;
    @Column(columnDefinition = "CLOB")
    private String description2;
    @Column(columnDefinition = "CLOB")
    private String description3;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate submissionDeadline;
    private double budget = 0;
    private String workExample;
    private String languageSpoken;
    private String location;

    public ServiceRequestDTO(ServiceRequest serviceRequest) {
        this.id = serviceRequest.getId();
        this.workCategory = serviceRequest.getWorkCategory();
        this.employmentType = serviceRequest.getEmploymentType();
        this.description1 = serviceRequest.getDescription1();
        this.description2 = serviceRequest.getDescription2();
        this.description3 = serviceRequest.getDescription3();
        this.submissionDeadline = serviceRequest.getSubmissionDeadline();
        this.budget = serviceRequest.getBudget();
        this.workExample = serviceRequest.getWorkExample();
        this.languageSpoken = serviceRequest.getLanguageSpoken();
        this.location = serviceRequest.getLocation();
    }

    public ServiceRequest updateServiceRequest(ServiceRequest serviceRequest) {
        serviceRequest.setWorkCategory(this.workCategory);
        serviceRequest.setEmploymentType(this.employmentType);
        serviceRequest.setDescription1(this.description1);
        serviceRequest.setDescription2(this.description2);
        serviceRequest.setDescription3(this.description3);
        serviceRequest.setSubmissionDeadline(this.submissionDeadline);
        serviceRequest.setBudget(this.budget);
        serviceRequest.setWorkExample(this.workExample);
        serviceRequest.setLanguageSpoken(this.languageSpoken);
        serviceRequest.setLocation(this.location);
        return serviceRequest;
    }
}

