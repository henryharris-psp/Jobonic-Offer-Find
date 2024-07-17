package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.ISkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@Tag(name = "skill", description = "Skill related APIs")
@RestController
@RequestMapping("/api/v1/skill")
public class SkillController {
    private final ISkillService skillService;

    @Autowired
    public SkillController(ISkillService skillService) {
        this.skillService = skillService;
    }

    @Operation(summary = APIDocsHelper.SkillAPI.SAVE_SKILL)
    @PostMapping
    public SkillDTO create(@RequestBody SkillDTO skillDTO) {
        return this.skillService.save(skillDTO);
    }

    @Operation(summary = APIDocsHelper.SkillAPI.UPDATE_SKILL)
    @PutMapping
    public SkillDTO update(@RequestParam UUID id, @RequestBody SkillDTO skillDTO) {
        return this.skillService.update(id, skillDTO);
    }

    @Operation(summary = APIDocsHelper.SkillAPI.DELETE_SKILL)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        this.skillService.delete(id);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.SKILL);
    }

    @Operation(summary = APIDocsHelper.SkillAPI.GET_ALL_SKILL)
    @GetMapping("/all")
    public Collection<SkillDTO> getAllSkill() {
        return this.skillService.getAll();
    }

    @Operation(summary = APIDocsHelper.SkillAPI.GET_ALL_SKILLS)
    @PostMapping("/all")
    public PaginationDTO<SkillDTO> getAllSkill(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.skillService.getAll(pageAndFilterDTO);
    }
}
