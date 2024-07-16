package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.UserSkillDTO;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface IUserSkillService {
    List<UserSkillDTO> addSkills(Long profileId, Set<UUID> skillIds);

    List<UserSkillDTO> getAllUserSkill(Long profileId);
}