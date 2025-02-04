package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.UserEducationDTO;
import com.laconic.fastworkapi.entity.UserEducation;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IUserEducationRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IUserEducationService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserEducationService implements IUserEducationService {
    private final IUserRepo userRepo;
    private final IUserEducationRepo userEducationRepo;

    @Autowired
    public UserEducationService(IUserRepo userRepo, IUserEducationRepo userEducationRepo) {
        this.userRepo = userRepo;
        this.userEducationRepo = userEducationRepo;
    }

    @Override
    public UserEducationDTO update(UUID id, UserEducationDTO userEducationDTO) {
        this.userRepo.findById(userEducationDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        userEducationDTO.getProfileId().toString()));
        var userEducation = getUserEducation(id);
        return new UserEducationDTO(this.userEducationRepo.save(userEducationDTO.updateUserEducation(userEducation)));
    }

    @Override
    public void delete(UUID id) {
        var userEducation = getUserEducation(id);
        userEducation.setActive(false);
        this.userEducationRepo.save(userEducation);
    }

    @Override
    public List<UserEducationDTO> getAll(Long profileId) {
        return this.userEducationRepo.findAllByProfile_Id(profileId).stream().map(UserEducationDTO::new).toList();
    }

    @Override
    public UserEducationDTO addEducation(UserEducationDTO userEducationDTO) {
        var profile =
                this.userRepo.findById(userEducationDTO.getProfileId())
                        .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                userEducationDTO.getProfileId().toString()));

        var userEducation = EntityMapper.mapToEntity(userEducationDTO, UserEducation.class);
        userEducation.setProfile(profile);
        this.userEducationRepo.save(userEducation);
        return new UserEducationDTO(userEducation);
    }

    private UserEducation getUserEducation(UUID id) {
        return this.userEducationRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER_EDUCATION, "id",
                        id.toString()));
    }
}
