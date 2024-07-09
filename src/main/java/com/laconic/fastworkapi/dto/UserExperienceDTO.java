package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.entity.UserExperience;
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
public class UserExperienceDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 7395305627407357359L;
    private UUID id;
    private UUID profileId;
    private String company;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    public UserExperienceDTO(UserExperience userExperience) {
        this.id = userExperience.getId();
        this.profileId = userExperience.getProfile().getId();
        this.company = userExperience.getCompany();
        this.startDate = userExperience.getStartDate();
        this.endDate = userExperience.getEndDate();
    }

    public UserExperience updateUserExperience(UserExperience userExperience) {
        userExperience.setCompany(this.company);
        userExperience.setStartDate(this.startDate);
        userExperience.setEndDate(this.endDate);
        return userExperience;
    }
}
