package com.laconic.fastworkapi.dto;

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
    private UUID profileId;
    private String institute;
    private String degree;
    private LocalDate startDate;
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
        userEducation.setInstitute(userEducation.getInstitute());
        userEducation.setDegree(userEducation.getDegree());
        userEducation.setStartDate(userEducation.getStartDate());
        userEducation.setEndDate(userEducation.getEndDate());
        return userEducation;
    }
}
