package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.UserEducationDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IProfileService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProfileService implements IProfileService {
    public ProfileService(IUserRepo userRepo) {
        this.userRepo = userRepo;
    }

    private final IUserRepo userRepo;

    // todo: need to fix
    @Override
    public ProfileDTO save(ProfileDTO profileDTO) {
        var profile = profileDTO.updateUser(new Profile());
        profile.getUserEducationList().forEach(profile::addEducation);
        profile.getUserExperienceList().forEach(profile::addExperience);
        return new ProfileDTO(this.userRepo.save(profile));
    }

    @Override
    public ProfileDTO update(UUID id, ProfileDTO profileDTO) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        return new ProfileDTO(this.userRepo.save(profileDTO.updateUser(existingUser)));
    }

    @Override
    public PaginationDTO<ProfileDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        Specification<Profile> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), Set.of(
                "username", "email"));
        var result = this.userRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result,
                                            result.getContent().stream().map(ProfileDTO::new).toList());
    }

    @Override
    public List<ProfileDTO> getAllUsers() {
        return this.userRepo.findAll().stream().map(ProfileDTO::new).toList();
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
