package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.UserSkillDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IUserSkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Tag(name = "user-skill", description = "User Skill related APIs")
@RestController
@RequestMapping("/api/v1/user-skill")
public class UserSkillController {
    private final IUserSkillService userSkillService;

    public UserSkillController(IUserSkillService userSkillService) {
        this.userSkillService = userSkillService;
    }

    @Operation(summary = APIDocsHelper.SkillAPI.ADD_SKILL)
    @PostMapping()
    public List<UserSkillDTO> add(@RequestParam Long profileId, @RequestParam Set<UUID> skillIds) {
        return this.userSkillService.addSkills(profileId, skillIds);
    }

    @Operation(summary = APIDocsHelper.SkillAPI.GET_ALL_USER_SKILL)
    @GetMapping("/all")
    public Collection<UserSkillDTO> getAllUserSkill(@RequestParam Long profileId) {
        return this.userSkillService.getAllUserSkill(profileId);
    }
}