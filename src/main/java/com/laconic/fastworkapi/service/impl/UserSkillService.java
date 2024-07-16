package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.UserSkillDTO;
import com.laconic.fastworkapi.entity.UserSkill;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.ISkillRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.IUserSkillRepo;
import com.laconic.fastworkapi.service.IUserSkillService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserSkillService implements IUserSkillService {
    private final IUserRepo userRepo;
    private final IUserSkillRepo userSkillRepo;
    private final ISkillRepo skillRepo;

    public UserSkillService(IUserRepo userRepo, IUserSkillRepo userSkillRepo, ISkillRepo skillRepo) {
        this.userRepo = userRepo;
        this.userSkillRepo = userSkillRepo;
        this.skillRepo = skillRepo;
    }


    @Override
    public List<UserSkillDTO> addSkills(Long userId, Set<UUID> skillIds) {
        var profile =
                this.userRepo.findById(userId)
                        .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                userId.toString()));

        var userSkills = skillIds.stream()
                .map(skillId -> UserSkill.builder()
                        .skillId(skillId)
                        .userId(userId)
                        .build())
                .collect(Collectors.toList());

        this.userSkillRepo.saveAll(userSkills);
        var skills = this.skillRepo.findAllById(skillIds).stream().map(SkillDTO::new).toList();
        return List.of(new UserSkillDTO(userId, new HashSet<>(skills)));
    }

    @Override
    public List<UserSkillDTO> getAllUserSkill(Long userId) {
//        var userSkills = this.userSkillRepo.findAllByUserId(userId);
//        var skillIds = userSkills.stream()
//                .map(UserSkill::getSkillId)
//                .collect(Collectors.toSet());
//
//        var skills = this.skillRepo.findAllById(skillIds);
//        var skillDTOMap = new HashMap<Long, SkillDTO>();
//
//
//        userSkills.forEach(userSkill -> {
//            var skillDTO = new SkillDTO();
//            skillDTO.setId(userSkill.getSkillId());
//            skillDTOMap.put(userSkill.getSkillId(), skillDTO);
//        });
//
//
//        skills.forEach(skill -> {
//            var skillDTO = skillDTOMap.get(skill.getId());
//            if (skillDTO != null) {
//                skillDTO.setName(skill.getName());
//            }
//        });
//
//        var allSkillDTOs = new HashSet<>(skillDTOMap.values());
//
//        return List.of(new UserSkillDTO(userId, allSkillDTOs));
        return null;
    }
}