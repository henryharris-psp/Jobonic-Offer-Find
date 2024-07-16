package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Skill;
import com.laconic.fastworkapi.entity.UserSkill;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ISkillRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.IUserSkillRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.ISkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SkillService implements ISkillService {
    private final ISkillRepo skillRepo;
    private final IUserRepo userRepo;
    private final IUserSkillRepo userSkillRepo;

    @Autowired
    public SkillService(ISkillRepo skillRepo, IUserRepo userRepo, IUserSkillRepo userSkillRepo) {
        this.skillRepo = skillRepo;
        this.userRepo = userRepo;
        this.userSkillRepo = userSkillRepo;
    }

    @Override
    public SkillDTO save(SkillDTO skillDTO) {
        return new SkillDTO(this.skillRepo.save(skillDTO.updateSkill(new Skill())));
    }

    @Override
    public void delete(UUID id) {
        var existingSkill = getSkill(id);
        existingSkill.setActive(false);
        this.skillRepo.save(existingSkill);
    }

    @Override
    public SkillDTO update(UUID id, SkillDTO skillDTO) {
        var existingSkill = getSkill(id);
        return new SkillDTO(this.skillRepo.save(skillDTO.updateSkill(existingSkill)));
    }

    @Override
    public List<SkillDTO> getAll() {
        return this.skillRepo.findAll().stream().map(SkillDTO::new).toList();
    }

    @Override
    public PaginationDTO<SkillDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        Specification<Skill> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), Set.of(
                        "name"));
        var result = this.skillRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result,
                result.getContent().stream().map(SkillDTO::new).toList());
    }

    @Override
    public List<SkillDTO> addSkills(Long profileId, Set<UUID> skillIds) {
        var profile =
                this.userRepo.findById(profileId)
                        .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                profileId.toString()));

        var userSkills = skillIds.stream().map(skillId -> UserSkill.builder()
                .skillId(skillId)
                .userId(profileId)
                .build()).collect(Collectors.toList());

        this.userSkillRepo.saveAll(userSkills);

        var savedSkillIds = this.userSkillRepo.findAllByUserId(profileId).stream()
                .map(UserSkill::getSkillId)
                .collect(Collectors.toSet());

        return this.skillRepo.findAllById(savedSkillIds).stream()
                .map(skill -> new SkillDTO(skill.getId(), skill.getName()))
                .collect(Collectors.toList());
    }

    private Skill getSkill(UUID id) {
        return this.skillRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SKILL, "id",
                                                                                               id.toString()));
    }
}
