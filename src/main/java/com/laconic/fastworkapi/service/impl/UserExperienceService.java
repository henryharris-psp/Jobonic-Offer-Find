package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.UserExperienceDTO;
import com.laconic.fastworkapi.entity.UserExperience;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IUserExperienceRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IUserExperienceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserExperienceService implements IUserExperienceService {
    private final IUserExperienceRepo userExperienceRepo;
    private final IUserRepo userRepo;

    public UserExperienceService(IUserExperienceRepo userExperienceRepo, IUserRepo userRepo) {
        this.userExperienceRepo = userExperienceRepo;
        this.userRepo = userRepo;
    }

    @Override
    public UserExperienceDTO update(UUID id, UserExperienceDTO userExperienceDTO) {
        var profile =
                this.userRepo.findById(userExperienceDTO.getProfileId())
                        .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                            userExperienceDTO.getProfileId().toString()));
        var userExperience = this.getUserExperience(id);
        return new UserExperienceDTO(this.userExperienceRepo.save(userExperienceDTO.updateUserExperience(userExperience)));
    }

    @Override
    public void delete(UUID id) {
        var userExperience = this.getUserExperience(id);
        userExperience.setActive(false);
        this.userExperienceRepo.save(userExperience);
    }

    @Override
    public List<UserExperienceDTO> getAll(UUID profileId) {
        return this.userExperienceRepo.findAllByProfile_Id(profileId).stream().map(UserExperienceDTO::new).toList();
    }

    private UserExperience getUserExperience(UUID id) {
        return this.userExperienceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER_EXPERIENCE, "id",
                                                                    id.toString()));
    }
}
