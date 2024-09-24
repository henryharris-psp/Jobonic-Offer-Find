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
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.*;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IProfileService;
import com.laconic.fastworkapi.utils.EntityMapper;
import com.mashape.unirest.http.Unirest;
import jakarta.transaction.Transactional;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService implements IProfileService {

    @Value("${authorize.url}")
    private String authorizeUrl;
    @Value("${authorize.password}")
    private String authorizePassword;
    @Value("${authorize.file}")
    private String filePathUrl;
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
        var userRoles = roles.stream().map(r -> UserRole.builder().roleId(r.getId()).userId(id).build()).toList();
        this.userRoleRepo.saveAll(userRoles);
        var roleIds = this.userRoleRepo.findAllByUserId(id).stream().map(UserRole::getRoleId).collect(Collectors.toSet());
        return this.roleRepo.findAllById(roleIds).stream().map(UserRoleDTO::new).collect(Collectors.toSet());
    }

    private Set<SkillDTO> addSkillsToProfile(Set<SkillDTO> skills, Long id) {
        var userSkills = skills.stream().map(s -> UserSkill.builder().skillId(s.getId()).userId(id).build()).toList();
        this.userSkillRepo.saveAll(userSkills);
        var skillIds = this.userSkillRepo.findAllByUserId(id).stream().map(UserSkill::getSkillId).collect(Collectors.toSet());
        return this.skillRepo.findAllById(skillIds).stream().map(SkillDTO::new).collect(Collectors.toSet());
    }


    @Override
    public ProfileDTO update(Long id, ProfileDTO profileDTO) {
        var existingUser = this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", id.toString()));
        return EntityMapper.mapToResponse(this.userRepo.save(profileDTO.updateUser(existingUser)), ProfileDTO.class);
    }

    @Override
    public ProfileDTO get(Long id) {
        var existingUser = this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", id.toString()));
        return EntityMapper.mapToResponse(existingUser, ProfileDTO.class);
    }

    @Override
    public PaginationDTO<ProfileDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        Specification<Profile> specification = GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), Set.of("username", "email"));
        var result = this.userRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result, result.getContent().stream().map(data -> EntityMapper.mapToResponse(data, ProfileDTO.class)).toList());
    }

    @Override
    public List<ProfileDTO> getAllUsers() {
        return this.userRepo.findAll().stream().map(data -> EntityMapper.mapToResponse(data, ProfileDTO.class)).toList();
    }

    @Override
    public String removeUser(Long id) {
        var existingUser = this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", id.toString()));
        existingUser.setActive(false);
        this.userRepo.save(existingUser);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.USER);
    }

    @Override
    public ProfileDTO getByUserId(Long userId) {
        var existingUser = this.userRepo.findByUserId(userId);
        if (Objects.isNull(existingUser)) {
            throw new NotFoundException("User dose not Found");
        }
        return EntityMapper.mapToResponse(existingUser, ProfileDTO.class);
    }

    @Override
    public UserProfileDTO getUserProfileDto(Long id, String name) {

        Profile existingUser = null;

        if (name.equalsIgnoreCase("profile")) {
            existingUser = userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                    id.toString()));
        }

        if (name.equalsIgnoreCase("user")) {
            existingUser = this.userRepo.findByUserId(id);
        }

        if (Objects.isNull(existingUser)) {
            throw new NotFoundException("User Not found");
        }

        String response = null;
        boolean status = true;
        String url = authorizeUrl.concat("/v1/user/getById/".concat(String.valueOf(existingUser.getUserId())));
        try {
            KeyStore keyStore = KeyStore.getInstance("PKCS12");
            try (FileInputStream file = new FileInputStream(filePathUrl)) {
                keyStore.load(file, authorizePassword.toCharArray());
            }

            SSLContext sslContext = SSLContextBuilder.create().
                    loadTrustMaterial(keyStore, null).build();

            SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext, NoopHostnameVerifier.INSTANCE);

            CloseableHttpClient httpClient = HttpClients.custom()
                    .setSSLSocketFactory(socketFactory).build();

            Unirest.setHttpClient(httpClient);

            response = Unirest.get(url)
                    .asString().getBody();

        } catch (Exception e) {
            status = false;
            e.printStackTrace();
        }

        if (!status || Objects.isNull(response)) {
            try {
                response = Unirest.get(url)
                        .asString().getBody();

                System.out.println(response);
                status = true;
            } catch (Exception e) {
                e.getMessage();

            }
        }

        if (!status) {
            throw new NotFoundException("Data is not available from auth server");
        }
        UserProfileDTO dto = EntityMapper.mapToResponse(existingUser, UserProfileDTO.class);
        JSONObject jsonResponse = new JSONObject(response);
        dto.setUsername(jsonResponse.getString("username"));
        dto.setFirstName(jsonResponse.getString("firstName"));
        dto.setLastName(jsonResponse.getString("lastName"));
        dto.setEmail(jsonResponse.getString("email"));
        dto.setUserId((jsonResponse.getLong("id")));

        return dto;
    }

    @Override
    public Profile getByRepo(Long id) {
        return this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", id.toString()));
    }
}
