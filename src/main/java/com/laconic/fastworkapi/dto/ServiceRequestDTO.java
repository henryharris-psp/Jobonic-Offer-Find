package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.ServiceRequest;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate submissionDeadline;
    private String workExample;
    private Long profileId;

    public ServiceRequestDTO(ServiceRequest serviceRequest) {
        this.id = serviceRequest.getId();
        this.submissionDeadline = serviceRequest.getSubmissionDeadline();
        this.workExample = serviceRequest.getWorkExample();
        this.profileId = serviceRequest.getProfile().getId();
    }

    public ServiceRequest updateServiceRequest(ServiceRequest serviceRequest) {
        serviceRequest.setSubmissionDeadline(this.submissionDeadline);
        serviceRequest.setWorkExample(this.workExample);
        return serviceRequest;
    }
}

