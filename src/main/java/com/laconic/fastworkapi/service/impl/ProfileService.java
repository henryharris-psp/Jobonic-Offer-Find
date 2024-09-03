package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.config.AuthenticationUtils;
import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.UserProfileDTO;
import com.laconic.fastworkapi.dto.UserRoleDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.UserRole;
import com.laconic.fastworkapi.entity.UserSkill;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.*;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IProfileService;
import com.laconic.fastworkapi.utils.EntityMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService implements IProfileService {

    private final IUserRepo userRepo;
    private final ISkillRepo skillRepo;
    private final IUserRoleRepo userRoleRepo;
    private final IUserSkillRepo userSkillRepo;
    private final IRoleRepo roleRepo;
    private final AuthenticationUtils authenticationUtils;

    @Autowired
    public ProfileService(IUserRepo userRepo, ISkillRepo skillRepo, IUserRoleRepo userRoleRepo, IUserSkillRepo userSkillRepo, IRoleRepo roleRepo, AuthenticationUtils authenticationUtils) {
        this.userRepo = userRepo;
        this.skillRepo = skillRepo;
        this.userRoleRepo = userRoleRepo;
        this.userSkillRepo = userSkillRepo;
        this.roleRepo = roleRepo;
        this.authenticationUtils = authenticationUtils;
    }

    @Override
    @Transactional
    public ProfileDTO save(ProfileDTO profileDTO) {
        var profile = EntityMapper.mapToEntity(profileDTO, Profile.class);
        if (profile.getUserEducationList() != null && !profile.getUserEducationList().isEmpty()) {
            profile.getUserEducationList().forEach(profile::addEducation);
        }
        if (profile.getUserExperienceList() != null && !profile.getUserExperienceList().isEmpty()) {
            profile.getUserExperienceList().forEach(profile::addExperience);
        }
        profile = this.userRepo.save(profile);
        var response = EntityMapper.mapToResponse(profile, ProfileDTO.class);
        if (profileDTO.getSkills() != null && !profileDTO.getSkills().isEmpty()) {
            response.setSkills(addSkillsToProfile(profileDTO.getSkills(), profile.getId()));
        }
//        if (profileDTO.getRoles() != null && !profileDTO.getRoles().isEmpty()) {
//            response.setRoles(addRolesToProfile(profileDTO.getRoles(), profile.getId()));
//        }
        return response;
    }

    private Set<UserRoleDTO> addRolesToProfile(Set<UserRoleDTO> roles, Long id) {
        var userRoles = roles.stream().map(r -> UserRole.builder()
                .roleId(r.getId())
                .userId(id)
                .build()).toList();
        this.userRoleRepo.saveAll(userRoles);
        var roleIds = this.userRoleRepo.findAllByUserId(id).stream().map(UserRole::getRoleId).collect(Collectors.toSet());
        return this.roleRepo.findAllById(roleIds).stream().map(UserRoleDTO::new).collect(Collectors.toSet());
    }

    private Set<SkillDTO> addSkillsToProfile(Set<SkillDTO> skills, Long id) {
        var userSkills = skills.stream().map(s -> UserSkill.builder()
                .skillId(s.getId())
                .userId(id)
                .build()).toList();
        this.userSkillRepo.saveAll(userSkills);
        var skillIds =
                this.userSkillRepo.findAllByUserId(id).stream().map(UserSkill::getSkillId).collect(Collectors.toSet());
        return this.skillRepo.findAllById(skillIds).stream().map(SkillDTO::new).collect(Collectors.toSet());
    }


    @Override
    public ProfileDTO update(Long id, ProfileDTO profileDTO) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        id.toString()));
        return EntityMapper.mapToResponse(this.userRepo.save(profileDTO.updateUser(existingUser)), ProfileDTO.class);
    }

    @Override
    public ProfileDTO get(Long id) {
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
    public String removeUser(Long id) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        id.toString()));
        existingUser.setActive(false);
        this.userRepo.save(existingUser);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.USER);
    }

    @Override
    public ProfileDTO getByUserId(Long userId) {
        var existingUser = this.userRepo.findByUserId(userId);
        return EntityMapper.mapToResponse(existingUser, ProfileDTO.class);
    }

    @Override
    public UserProfileDTO getUserProfileDto(Long id) {
        var existingUser = this.userRepo.findByUserId(id);
        UserProfileDTO dto = EntityMapper.mapToResponse(existingUser, UserProfileDTO.class);
        dto.setUsername(authenticationUtils.genericTokenValue("preferred_username"));
        dto.setFirstName(authenticationUtils.genericTokenValue("given_name"));
        dto.setLastName(authenticationUtils.genericTokenValue("family_name"));
        dto.setEmail(authenticationUtils.getEmail());
        dto.setUserId(Long.parseLong(authenticationUtils.genericTokenValue("userid")));
        return dto;
    }
}
