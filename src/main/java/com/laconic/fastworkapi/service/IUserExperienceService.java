package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.UserExperienceDTO;

import java.util.List;
import java.util.UUID;

public interface IUserExperienceService {
    UserExperienceDTO update(UUID id, UserExperienceDTO userExperienceDTO);

    void delete(UUID id);

    List<UserExperienceDTO> getAll(Long profileId);

    UserExperienceDTO addExperience(UserExperienceDTO userExperience);
}
