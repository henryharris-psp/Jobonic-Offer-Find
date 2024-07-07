package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.UserEducationDTO;
import com.laconic.fastworkapi.dto.UserExperienceDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.UserEducation;
import com.laconic.fastworkapi.entity.UserExperience;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IProfileService;
import com.laconic.fastworkapi.utils.EntityMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProfileService implements IProfileService {
    public ProfileService(IUserRepo userRepo) {
        this.userRepo = userRepo;
    }

    private final IUserRepo userRepo;

    @Override
    @Transactional
    public ProfileDTO save(ProfileDTO profileDTO) {
        var profile = EntityMapper.mapToEntity(profileDTO, Profile.class);
        profile.getUserEducationList().forEach(profile::addEducation);
        profile.getUserExperienceList().forEach(profile::addExperience);
        return EntityMapper.mapToResponse(this.userRepo.save(profile), ProfileDTO.class);
    }


    @Override
    public ProfileDTO update(UUID id, ProfileDTO profileDTO) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        return EntityMapper.mapToResponse(this.userRepo.save(profileDTO.updateUser(existingUser)), ProfileDTO.class);
    }

    @Override
    public ProfileDTO get(UUID id) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        return EntityMapper.mapToResponse(existingUser, ProfileDTO.class);
    }

    @Override
    public PaginationDTO<ProfileDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        Specification<Profile> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), Set.of(
                        "username", "email"));
        var result = this.userRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result,
                                            result.getContent().stream().map(data -> EntityMapper.mapToResponse(data,
                                                                                                                ProfileDTO.class)).toList());
    }

    @Override
    public List<ProfileDTO> getAllUsers() {
        return this.userRepo.findAll().stream().map(data -> EntityMapper.mapToResponse(data,
                                                                                       ProfileDTO.class)).toList();
    }

    @Override
    public String removeUser(UUID id) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        existingUser.setActive(false);
        this.userRepo.save(existingUser);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.USER);
    }
}
