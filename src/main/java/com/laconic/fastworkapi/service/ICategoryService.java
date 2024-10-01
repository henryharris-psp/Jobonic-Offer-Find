package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CategoryDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    CategoryDTO save(CategoryDTO categoryDTO);
    CategoryDTO update(UUID id, CategoryDTO categoryDTO);
    CategoryDTO getById(UUID id);
    PaginationDTO<CategoryDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
    String delete(UUID id);
}
