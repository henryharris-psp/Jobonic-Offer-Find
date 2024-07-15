package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.UserEducation;
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
public class UserEducationDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -84465497181725405L;
    private UUID id;
    private Long profileId;
    private String institute;
    private String degree;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    public UserEducationDTO(UserEducation userEducation) {
        this.id = userEducation.getId();
        this.profileId = userEducation.getProfile().getId();
        this.institute = userEducation.getInstitute();
        this.degree = userEducation.getDegree();
        this.startDate = userEducation.getStartDate();
        this.endDate = userEducation.getEndDate();
    }

    public UserEducation updateUserEducation(UserEducation userEducation) {
        userEducation.setInstitute(this.getInstitute());
        userEducation.setDegree(this.getDegree());
        userEducation.setStartDate(this.getStartDate());
        userEducation.setEndDate(this.getEndDate());
        return userEducation;
    }
}
