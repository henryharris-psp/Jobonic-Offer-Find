package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.Skill;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ISkillRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.ISkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class SkillService implements ISkillService {
    private final ISkillRepo skillRepo;

    @Autowired
    public SkillService(ISkillRepo skillRepo) {
        this.skillRepo = skillRepo;
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

    private Skill getSkill(UUID id) {
        return this.skillRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SKILL, "id",
                                                                                               id.toString()));
    }
}
