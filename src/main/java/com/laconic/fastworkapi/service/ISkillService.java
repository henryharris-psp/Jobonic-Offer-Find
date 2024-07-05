package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.SkillDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;
import java.util.UUID;

public interface ISkillService {
    SkillDTO save(SkillDTO skillDTO);
    void delete(UUID id);
    SkillDTO update(UUID id, SkillDTO skillDTO);
    List<SkillDTO> getAll();
    PaginationDTO<SkillDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
}
